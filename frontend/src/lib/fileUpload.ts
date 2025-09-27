import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid'

// File upload configuration
export const FILE_CONFIG = {
  maxSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760'), // 10MB default
  allowedTypes: (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 
    'image/jpeg,image/png,image/webp,text/csv,application/json,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ).split(','),
  imageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  csvTypes: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  jsonTypes: ['application/json']
}

// Types for file processing
export interface FileValidationResult {
  isValid: boolean
  error?: string
  file?: File
}

export interface ProcessedTripData {
  tripNumber?: string
  originName: string
  originLat: number
  originLng: number
  destName: string
  destLat: number
  destLng: number
  startTime: string
  endTime?: string
  mode: string
  purpose: string
  notes?: string
  companions?: Array<{
    name: string
    age: number
    relation: string
  }>
}

export interface ProcessedCulturalSiteData {
  name: string
  description: string
  type: string
  latitude: number
  longitude: number
  address: string
  culturalSignificance: string
  historicalPeriod?: string
  entryFee?: number
  facts: string[]
  localInsights: string[]
  isHiddenGem: boolean
}

export interface UploadedImage {
  id: string
  file: File
  preview: string
  name: string
  size: number
  type: string
}

class FileUploadService {
  // File validation
  validateFile(file: File): FileValidationResult {
    if (!file) {
      return { isValid: false, error: 'No file provided' }
    }

    if (file.size > FILE_CONFIG.maxSize) {
      return { 
        isValid: false, 
        error: `File size exceeds limit of ${(FILE_CONFIG.maxSize / 1024 / 1024).toFixed(1)}MB` 
      }
    }

    if (!FILE_CONFIG.allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: `File type ${file.type} is not allowed` 
      }
    }

    return { isValid: true, file }
  }

  // Image processing
  async processImage(file: File): Promise<UploadedImage> {
    const validation = this.validateFile(file)
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    if (!FILE_CONFIG.imageTypes.includes(file.type)) {
      throw new Error('File is not a valid image')
    }

    const preview = URL.createObjectURL(file)
    
    return {
      id: uuidv4(),
      file,
      preview,
      name: file.name,
      size: file.size,
      type: file.type
    }
  }

  // CSV/Excel processing for trip data
  async processCSVTripData(file: File): Promise<ProcessedTripData[]> {
    const validation = this.validateFile(file)
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    return new Promise((resolve, reject) => {
      if (file.type === 'text/csv') {
        // Handle CSV files
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            try {
              const processedData: ProcessedTripData[] = results.data.map((row: any, index: number) => {
                if (!row.originName || !row.destName) {
                  throw new Error(`Row ${index + 1}: Missing required fields (originName, destName)`)
                }

                return {
                  tripNumber: row.tripNumber || `TRP-${Date.now()}-${index}`,
                  originName: row.originName,
                  originLat: parseFloat(row.originLat) || 0,
                  originLng: parseFloat(row.originLng) || 0,
                  destName: row.destName,
                  destLat: parseFloat(row.destLat) || 0,
                  destLng: parseFloat(row.destLng) || 0,
                  startTime: row.startTime || new Date().toISOString(),
                  endTime: row.endTime || undefined,
                  mode: row.mode || 'CAR',
                  purpose: row.purpose || 'LEISURE',
                  notes: row.notes || undefined,
                  companions: row.companions ? JSON.parse(row.companions) : undefined
                }
              })
              resolve(processedData)
            } catch (error) {
              reject(error)
            }
          },
          error: (error) => reject(new Error(`CSV parsing error: ${error.message}`))
        })
      } else {
        // Handle Excel files
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet)

            const processedData: ProcessedTripData[] = jsonData.map((row: any, index: number) => {
              if (!row.originName || !row.destName) {
                throw new Error(`Row ${index + 1}: Missing required fields (originName, destName)`)
              }

              return {
                tripNumber: row.tripNumber || `TRP-${Date.now()}-${index}`,
                originName: row.originName,
                originLat: parseFloat(row.originLat) || 0,
                originLng: parseFloat(row.originLng) || 0,
                destName: row.destName,
                destLat: parseFloat(row.destLat) || 0,
                destLng: parseFloat(row.destLng) || 0,
                startTime: row.startTime || new Date().toISOString(),
                endTime: row.endTime || undefined,
                mode: row.mode || 'CAR',
                purpose: row.purpose || 'LEISURE',
                notes: row.notes || undefined,
                companions: typeof row.companions === 'string' ? JSON.parse(row.companions) : row.companions
              }
            })
            resolve(processedData)
          } catch (error) {
            reject(new Error(`Excel processing error: ${error}`))
          }
        }
        reader.readAsArrayBuffer(file)
      }
    })
  }

  // JSON configuration processing
  async processJSONConfig(file: File): Promise<any> {
    const validation = this.validateFile(file)
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    if (!FILE_CONFIG.jsonTypes.includes(file.type)) {
      throw new Error('File is not a valid JSON file')
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string)
          resolve(jsonData)
        } catch (error) {
          reject(new Error('Invalid JSON format'))
        }
      }
      reader.onerror = () => reject(new Error('Error reading file'))
      reader.readAsText(file)
    })
  }

  // Cloudinary image upload
  async uploadImageToCloudinary(file: File): Promise<{ url: string; public_id: string }> {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Cloudinary configuration not found')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      return {
        url: data.secure_url,
        public_id: data.public_id
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      throw error
    }
  }

  // Generate sample CSV template
  generateTripCSVTemplate(): string {
    const headers = [
      'tripNumber',
      'originName',
      'originLat',
      'originLng',
      'destName',
      'destLat',
      'destLng',
      'startTime',
      'endTime',
      'mode',
      'purpose',
      'notes',
      'companions'
    ]

    const sampleData = [
      'TRP-001-2024',
      'Home',
      '40.7505',
      '-73.9934',
      'Ancient Temple',
      '40.7589',
      '-73.9851',
      '2024-01-15T09:00:00Z',
      '2024-01-15T17:00:00Z',
      'CAR',
      'CULTURAL',
      'Family trip to cultural site',
      '[{"name":"Jane Doe","age":32,"relation":"Spouse"}]'
    ]

    return [headers.join(','), sampleData.join(',')].join('\n')
  }

  // Download template file
  downloadTemplate(filename: string, content: string, type: string = 'text/csv') {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const fileUploadService = new FileUploadService()
export default fileUploadService
