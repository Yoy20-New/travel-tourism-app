"use client"

import { useState, useEffect } from 'react'
import { 
  Calculator, 
  Package, 
  Watch, 
  CreditCard, 
  Phone, 
  MessageCircle, 
  DollarSign, 
  PlusCircle,
  CheckCircle,
  Circle,
  Smartphone,
  Bell,
  TrendingUp,
  ArrowUpDown,
  MapPin,
  Star,
  Badge
} from 'lucide-react'
import advancedFeaturesService from '@/lib/advancedFeatures'
import { 
  BudgetEstimate, 
  PackingList, 
  PackingItem,
  WearableNotification, 
  CurrencyRate,
  Expense,
  GuideContact 
} from '@/types/advanced'

// 4. Budget Estimator Component
export function BudgetEstimator() {
  const [estimate, setEstimate] = useState<BudgetEstimate | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    duration: 3,
    travelers: 2
  })

  const calculateBudget = async () => {
    if (!formData.destination) return
    
    setLoading(true)
    try {
      const budgetEstimate = await advancedFeaturesService.estimateTripBudget(
        formData.destination,
        formData.duration,
        formData.travelers
      )
      setEstimate(budgetEstimate)
    } catch (error) {
      console.error('Error calculating budget:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: estimate?.currency || 'USD'
    }).format(amount)
  }

  const getBreakdownColor = (category: string) => {
    const colors = {
      accommodation: 'bg-blue-500',
      food: 'bg-green-500',
      transport: 'bg-yellow-500',
      activities: 'bg-purple-500',
      shopping: 'bg-pink-500',
      miscellaneous: 'bg-gray-500'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-green-600" />
          Budget Estimator
        </h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              placeholder="e.g., Paris, France"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (days)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Travelers
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.travelers}
              onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={calculateBudget}
          disabled={loading || !formData.destination}
          className={`w-full py-2 px-4 rounded-lg font-medium ${
            loading || !formData.destination
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {loading ? 'Calculating...' : 'Estimate Budget'}
        </button>

        {estimate && (
          <div className="space-y-4">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h4 className="text-2xl font-bold text-green-700">
                {formatCurrency(estimate.totalEstimate)}
              </h4>
              <p className="text-sm text-green-600">
                Estimated total cost • {Math.round(estimate.confidence * 100)}% confidence
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Cost Breakdown</h5>
              {Object.entries(estimate.breakdown).map(([category, amount]) => {
                const percentage = (amount / estimate.totalEstimate) * 100
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{category}</span>
                      <span className="font-medium">{formatCurrency(amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getBreakdownColor(category)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Pro tip:</strong> Budget estimates are based on average costs. 
                Actual expenses may vary based on your travel style and season.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 5. Packing Assistant Component
export function PackingAssistant() {
  const [packingList, setPackingList] = useState<PackingList | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    season: 'summer',
    duration: 5
  })

  const generatePackingList = async () => {
    if (!formData.destination) return
    
    setLoading(true)
    try {
      const list = await advancedFeaturesService.generatePackingList(
        formData.destination,
        formData.season,
        formData.duration
      )
      setPackingList(list)
    } catch (error) {
      console.error('Error generating packing list:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleItem = (itemId: string) => {
    if (!packingList) return
    
    setPackingList({
      ...packingList,
      items: packingList.items.map(item =>
        item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
      )
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'text-red-600 bg-red-100'
      case 'recommended': return 'text-yellow-600 bg-yellow-100'
      case 'optional': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      clothing: '👔',
      electronics: '🔌',
      toiletries: '🧴',
      documents: '📄',
      medical: '💊',
      accessories: '🎒'
    }
    return icons[category as keyof typeof icons] || '📦'
  }

  const groupedItems = packingList?.items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, PackingItem[]>) || {}

  const packedCount = packingList?.items.filter(item => item.isPacked).length || 0
  const totalCount = packingList?.items.length || 0
  const completionPercentage = totalCount > 0 ? (packedCount / totalCount) * 100 : 0

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Package className="w-5 h-5 mr-2 text-blue-600" />
          Packing Assistant
        </h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              placeholder="e.g., Tokyo, Japan"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Season
            </label>
            <select
              value={formData.season}
              onChange={(e) => setFormData({...formData, season: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="monsoon">Monsoon</option>
              <option value="spring">Spring</option>
              <option value="autumn">Autumn</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (days)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={generatePackingList}
          disabled={loading || !formData.destination}
          className={`w-full py-2 px-4 rounded-lg font-medium ${
            loading || !formData.destination
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Packing List'}
        </button>

        {packingList && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">
                Packing List for {packingList.destination}
              </h4>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {packedCount} of {totalCount} items packed
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {packingList.weatherContext && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Weather Info:</strong> {packingList.weatherContext.recommendation}
                  <br />
                  <span className="text-xs">
                    Temp: {packingList.weatherContext.averageTemp.low}°C - {packingList.weatherContext.averageTemp.high}°C
                  </span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h5 className="font-medium text-gray-900 flex items-center capitalize">
                    <span className="mr-2">{getCategoryIcon(category)}</span>
                    {category} ({items.length} items)
                  </h5>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                      >
                        <div className="flex items-center flex-1">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="mr-3"
                          >
                            {item.isPacked ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          <span className={`flex-1 ${item.isPacked ? 'line-through text-gray-500' : ''}`}>
                            {item.name} {item.quantity > 1 && `(${item.quantity})`}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 7. Currency & Expense Tracker Component
export function CurrencyTracker() {
  const [rate, setRate] = useState<CurrencyRate | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(false)
  const [conversionData, setConversionData] = useState({
    from: 'USD',
    to: 'EUR',
    amount: 100
  })
  const [newExpense, setNewExpense] = useState({
    amount: '',
    currency: 'USD',
    category: 'food' as const,
    description: '',
    location: ''
  })

  const convertCurrency = async () => {
    setLoading(true)
    try {
      const exchangeRate = await advancedFeaturesService.getCurrencyRate(
        conversionData.from,
        conversionData.to
      )
      setRate(exchangeRate)
    } catch (error) {
      console.error('Error getting exchange rate:', error)
    } finally {
      setLoading(false)
    }
  }

  const addExpense = async () => {
    if (!newExpense.amount || !newExpense.description) return
    
    try {
      const expense = await advancedFeaturesService.addExpense({
        tripId: 'current-trip',
        amount: parseFloat(newExpense.amount),
        currency: newExpense.currency,
        category: newExpense.category,
        description: newExpense.description,
        location: newExpense.location,
        timestamp: new Date().toISOString(),
        paymentMethod: 'card'
      })
      
      setExpenses([expense, ...expenses])
      setNewExpense({
        amount: '',
        currency: 'USD',
        category: 'food',
        description: '',
        location: ''
      })
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const getCategoryColor = (category: string) => {
    const colors = {
      food: 'bg-green-100 text-green-800',
      transport: 'bg-blue-100 text-blue-800',
      accommodation: 'bg-purple-100 text-purple-800',
      activities: 'bg-yellow-100 text-yellow-800',
      shopping: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-green-600" />
          Currency & Expenses
        </h3>
      </div>

      <div className="space-y-6">
        {/* Currency Converter */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Currency Converter</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={conversionData.amount}
                onChange={(e) => setConversionData({...conversionData, amount: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <select
                value={conversionData.from}
                onChange={(e) => setConversionData({...conversionData, from: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <select
                value={conversionData.to}
                onChange={(e) => setConversionData({...conversionData, to: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <button
              onClick={convertCurrency}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? '...' : 'Convert'}
            </button>
          </div>

          {rate && (
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">
                  {(conversionData.amount * rate.rate).toFixed(2)} {rate.to}
                </div>
                <div className="text-sm text-green-600">
                  1 {rate.from} = {rate.rate} {rate.to}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Last updated: {new Date(rate.lastUpdated).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expense Tracker */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Expense Tracker</h4>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                ${totalExpenses.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">Total Spent</div>
            </div>
          </div>

          {/* Add Expense Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <select
              value={newExpense.currency}
              onChange={(e) => setNewExpense({...newExpense, currency: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value as any})}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="accommodation">Accommodation</option>
              <option value="activities">Activities</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <button
            onClick={addExpense}
            disabled={!newExpense.amount || !newExpense.description}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            Add Expense
          </button>

          {/* Expenses List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                    <span className="text-sm font-medium">
                      {expense.amount} {expense.currency}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">{expense.description}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(expense.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
            
            {expenses.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No expenses recorded yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

