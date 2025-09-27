"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, Image, Download } from 'lucide-react'
import fileUploadService, { FILE_CONFIG } from '@/lib/fileUpload'

interface FileUploadProps {
  onFilesProcessed: (data: any) => void
  acceptedFileTypes?: string[]
  maxFiles?: number
  uploadType: 'image' | 'csv' | 'json'
  title?: string
  description?: string
}

export default function FileUpload({
  onFilesProcessed,
  acceptedFileTypes,
  maxFiles = 5,
  uploadType,
  title,
  description
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAcceptedTypes = () => {
    switch (uploadType) {
      case 'image':
        return FILE_CONFIG.imageTypes.join(',')
      case 'csv':
        return FILE_CONFIG.csvTypes.join(',')
      case 'json':
        return FILE_CONFIG.jsonTypes.join(',')
      default:
        return acceptedFileTypes?.join(',') || FILE_CONFIG.allowedTypes.join(',')
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null)
    setIsProcessing(true)

    try {
      const processedFiles: any[] = []

      for (const file of acceptedFiles) {
        const validation = fileUploadService.validateFile(file)
        if (!validation.isValid) {
          throw new Error(validation.error)
        }

        let processedData
        switch (uploadType) {
          case 'image':
            processedData = await fileUploadService.processImage(file)
            break
          case 'csv':
            processedData = await fileUploadService.processCSVTripData(file)
            break
          case 'json':
            processedData = await fileUploadService.processJSONConfig(file)
            break
          default:
            processedData = { file, name: file.name, type: file.type, size: file.size }
        }

        processedFiles.push(processedData)
      }

      setUploadedFiles(prev => [...prev, ...processedFiles])
      onFilesProcessed(processedFiles)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing files')
    } finally {
      setIsProcessing(false)
    }
  }, [uploadType, onFilesProcessed])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      [getAcceptedTypes()]: []
    },
    maxFiles,
    disabled: isProcessing
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index)
      onFilesProcessed(newFiles)
      return newFiles
    })
  }

  const downloadTemplate = () => {
    if (uploadType === 'csv') {
      const template = fileUploadService.generateTripCSVTemplate()
      fileUploadService.downloadTemplate('trip_template.csv', template)
    }
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />
    if (type.includes('csv') || type.includes('excel')) return <FileText className="w-8 h-8 text-green-500" />
    if (type.includes('json')) return <FileText className="w-8 h-8 text-orange-500" />
    return <FileText className="w-8 h-8 text-gray-500" />
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
        
        {uploadType === 'csv' && (
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 mb-4"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV Template
          </button>
        )}
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        
        {isDragActive ? (
          <p className="text-blue-600">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Drag & drop {uploadType} files here, or click to select files
            </p>
            <p className="text-xs text-gray-500">
              Max {maxFiles} files • Max {(FILE_CONFIG.maxSize / 1024 / 1024).toFixed(1)}MB each
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-600">Processing files...</p>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                {uploadType === 'image' && file.preview ? (
                  <img 
                    src={file.preview} 
                    alt={file.name} 
                    className="w-8 h-8 rounded object-cover mr-3"
                  />
                ) : (
                  <div className="mr-3">
                    {getFileIcon(file.type || 'unknown')}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {file.name || `File ${index + 1}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {uploadType === 'csv' && Array.isArray(file) 
                      ? `${file.length} records` 
                      : file.size ? `${(file.size / 1024).toFixed(1)} KB` : ''
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
