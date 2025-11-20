# Quick Reference: Tailwind to CSS Class Conversion

## Most Common Conversions in Your App

### Containers & Layout
```
className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50"
→ className="app-container"

className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
→ className="main-content"

className="max-w-5xl mx-auto"
→ className="max-w-5xl" style={{ margin: '0 auto' }}

className="max-w-4xl mx-auto"
→ className="max-w-4xl" style={{ margin: '0 auto' }}
```

### Headers
```
className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm"
→ className="app-header"

className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
→ className="header-content"

className="flex items-center justify-between"
→ className="header-inner"
```

### Cards
```
className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200"
→ className="card card-gradient-indigo"

className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
→ className="card card-gradient-orange"

className="bg-white/80 backdrop-blur-lg"
→ className="card card-white-glass"

className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-0 text-white"
→ className="card card-gradient-robot"
```

### Grids
```
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
→ className="grid-4"

className="grid grid-cols-1 lg:grid-cols-3 gap-6"
→ className="grid-3"

className="grid grid-cols-1 lg:grid-cols-2 gap-6"
→ className="grid-2"
```

### Flexbox
```
className="flex items-center gap-3"
→ className="flex items-center gap-3"

className="flex items-center justify-between"
→ className="flex items-center justify-between"

className="flex flex-col"
→ className="flex flex-col"

className="flex-1"
→ className="flex-1"
```

### Spacing (Keep or Use Classes)
```
className="space-y-6"
→ className="space-y-6"

className="space-y-4"
→ className="space-y-4"

className="mb-4"
→ className="mb-4"

className="mt-6"
→ className="mt-6"

className="px-3 py-2"
→ className="px-3 py-2"

className="p-4"
→ className="p-4"
```

### Buttons
```
className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
→ className="btn btn-primary btn-full"

className="bg-gradient-to-r from-indigo-600 to-purple-600"
→ className="btn btn-primary"

size="sm" variant="outline"
→ className="btn btn-sm btn-outline"

variant="ghost"
→ className="btn btn-ghost"
```

### Text
```
className="text-gray-900"
→ className="text-gray-900"

className="text-sm text-gray-600"
→ className="text-sm text-gray-600"

className="text-center"
→ className="text-center"

className="text-white"
→ className="text-white"

className="text-lg"
→ className="text-lg"
```

### Badges/Stats
```
className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-3 py-2 rounded-lg"
→ className="stat-card stat-card-streak"

className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-2 rounded-lg"
→ className="stat-card stat-card-level"

className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 px-3 py-2 rounded-lg"
→ className="stat-card stat-card-coins"
```

### Borders & Rounded
```
className="rounded-lg"
→ className="rounded-lg"

className="rounded-2xl"
→ className="rounded-2xl"

className="rounded-full"
→ className="rounded-full"

className="border border-purple-100"
→ className="border border-purple-100"
```

### Shadows
```
className="shadow-2xl"
→ className="shadow-2xl"

className="shadow-xl"
→ className="shadow-xl"

className="shadow-lg"
→ className="shadow-lg"

className="shadow-sm"
→ className="shadow-sm"
```

### Positioning
```
className="relative"
→ className="relative"

className="absolute top-0 left-0 right-0 bottom-0"
→ className="absolute inset-0"

className="fixed top-1/2 left-1/2"
→ className="fixed" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
```

### Background Blobs (Animated Background Elements)
```
className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
→ className="bg-blob bg-blob-purple"

className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
→ className="bg-blob bg-blob-indigo"
```

### Robot/Chat Specific
```
className="max-w-5xl mx-auto"
→ className="chat-container"

className="grid grid-cols-1 lg:grid-cols-3 gap-6"
→ className="chat-grid"

className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
→ className="chat-bubble-user"

className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
→ className="chat-bubble-bot"
```

### Forms
```
className="space-y-5"
→ className="space-y-5" (or use <form> with CSS)

<Input className="mt-1.5" />
→ <Input className="form-input mt-1" />

<Label className="flex items-center gap-2" />
→ <Label className="form-label" />
```

### Icons
```
className="w-4 h-4"
→ className="icon-sm"

className="w-5 h-5"
→ className="icon-md"

className="w-6 h-6"
→ className="icon-lg"

className="w-8 h-8"
→ className="icon-xl"
```

### Special Components

#### Login Page
```
min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4
→ className="login-container"

className="w-full max-w-md relative z-10"
→ className="login-card"

className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
→ className="login-gradient-bar"
```

#### Mood Selector
```
min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4
→ className="mood-container"

className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
→ className="mood-grid"

className="cursor-pointer transition-all duration-300"
→ className="mood-option transition-all"
```

#### Robot Greeting
```
className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-0 text-white overflow-hidden relative"
→ className="robot-greeting-card"

className="relative w-32 h-32"
→ className="robot-3d-container"
```

### Responsive (Hidden Classes)
```
className="hidden sm:inline"
→ className="hidden-sm"

className="flex sm:hidden"
→ Add @media queries or use inline style conditionally
```

## Usage Tips

1. **Search and Replace:** Use these patterns for bulk conversion
2. **Combine Classes:** You can combine multiple CSS classes: `className="flex items-center gap-3 mb-4"`
3. **Inline Styles:** For one-off adjustments, use `style={{}}` prop
4. **Check app-styles.css:** All these classes are defined there

## Example Full Conversion

**Before:**
```tsx
<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
  <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-gray-900">AI Learning Companion</h1>
        </div>
      </div>
    </div>
  </header>
</div>
```

**After:**
```tsx
<div className="app-container">
  <header className="app-header">
    <div className="header-content">
      <div className="header-inner">
        <div className="header-logo">
          <div className="logo-icon">
            <Brain className="icon-lg text-white" />
          </div>
          <h1 className="text-gray-900">AI Learning Companion</h1>
        </div>
      </div>
    </div>
  </header>
</div>
```

---

**Remember:** Motion animations, component logic, and ShadCN components remain unchanged. Only update `className` attributes!
