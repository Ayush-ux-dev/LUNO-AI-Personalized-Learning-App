# Component Update Example - Using Flask API

## How to Update React Components

This guide shows you how to update your React components from using localStorage to using the Flask API.

---

## Example 1: Login Component

### Before (localStorage):

```tsx
// Old LoginPage.tsx
const handleLogin = (email: string, regNo: string) => {
  const loginData = {
    email,
    registrationNo: regNo,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('userLogin', JSON.stringify(loginData));
  setIsLoggedIn(true);
};
```

### After (Flask API):

```tsx
// New LoginPage.tsx
import { login } from '../services/api';

const handleLogin = async (email: string, regNo: string) => {
  try {
    const response = await login(email, regNo);
    // Token is automatically saved
    setIsLoggedIn(true);
    
    // Check if user has profile
    if (!response.user.hasProfile) {
      // Redirect to onboarding
      navigate('/onboarding');
    }
  } catch (error) {
    console.error('Login failed:', error);
    toast.error('Login failed. Please try again.');
  }
};
```

---

## Example 2: Student Profile (Onboarding)

### Before (localStorage):

```tsx
// Old StudentOnboarding.tsx
const handleOnboardingComplete = (data: any) => {
  const enhancedData = {
    ...data,
    level: 1,
    xp: 0,
    streak: 0,
    coins: 100
  };
  localStorage.setItem('studentProfile', JSON.stringify(enhancedData));
  setIsOnboarded(true);
};
```

### After (Flask API):

```tsx
// New StudentOnboarding.tsx
import { createProfile } from '../services/api';

const handleOnboardingComplete = async (data: any) => {
  try {
    const enhancedData = {
      ...data,
      level: 1,
      xp: 0,
      streak: 0,
      coins: 100
    };
    
    await createProfile(enhancedData);
    setIsOnboarded(true);
  } catch (error) {
    console.error('Failed to save profile:', error);
    toast.error('Failed to save profile. Please try again.');
  }
};
```

---

## Example 3: Loading Profile Data

### Before (localStorage):

```tsx
// Old App.tsx
useEffect(() => {
  const storedData = localStorage.getItem('studentProfile');
  if (storedData) {
    const data = JSON.parse(storedData);
    setStudentData(data);
    setIsOnboarded(true);
  }
}, []);
```

### After (Flask API):

```tsx
// New App.tsx
import { getProfile, isAuthenticated } from './services/api';

useEffect(() => {
  const loadProfile = async () => {
    if (!isAuthenticated()) {
      return;
    }
    
    try {
      const profile = await getProfile();
      setStudentData(profile);
      setIsOnboarded(true);
    } catch (error) {
      console.error('Failed to load profile:', error);
      // User might not have profile yet
      setIsOnboarded(false);
    }
  };
  
  loadProfile();
}, []);
```

---

## Example 4: Mood Selector

### Before (localStorage):

```tsx
// Old MoodSelector.tsx
const handleMoodSelected = (mood: string) => {
  const today = new Date().toDateString();
  localStorage.setItem('lastMoodDate', today);
  localStorage.setItem('currentMood', mood);
  onMoodSelected(mood);
};
```

### After (Flask API):

```tsx
// New MoodSelector.tsx
import { saveMood } from '../services/api';

const handleMoodSelected = async (mood: string) => {
  try {
    await saveMood(mood);
    toast.success('Mood saved!');
    onMoodSelected(mood);
  } catch (error) {
    console.error('Failed to save mood:', error);
    toast.error('Failed to save mood. Please try again.');
  }
};
```

---

## Example 5: Chat Messages

### Before (localStorage):

```tsx
// Old ChatbotTeacher.tsx
useEffect(() => {
  const savedMessages = localStorage.getItem('chatHistory');
  if (savedMessages) {
    setMessages(JSON.parse(savedMessages));
  }
}, []);

useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }
}, [messages]);
```

### After (Flask API):

```tsx
// New ChatbotTeacher.tsx
import { getChatMessages, saveChatMessage, generateAIResponse } from '../services/api';

// Load messages
useEffect(() => {
  const loadMessages = async () => {
    try {
      const { messages: savedMessages } = await getChatMessages('main');
      setMessages(savedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  };
  
  loadMessages();
}, []);

// Send message
const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = {
    role: 'user' as const,
    content: input,
    emotion: currentEmotion
  };

  // Optimistic update
  setMessages(prev => [...prev, {
    ...userMessage,
    id: 'temp-' + Date.now(),
    timestamp: new Date()
  }]);
  
  setIsTyping(true);
  setInput('');

  try {
    // Save user message
    await saveChatMessage({
      ...userMessage,
      chatType: 'main'
    });

    // Get AI response
    const response = await generateAIResponse(input, currentEmotion);
    
    const assistantMessage = {
      role: 'assistant' as const,
      content: response.content,
      robotEmotion: response.emotion
    };

    // Save AI message
    await saveChatMessage({
      ...assistantMessage,
      chatType: 'main'
    });

    // Update UI
    setMessages(prev => [...prev, {
      ...assistantMessage,
      id: Date.now().toString(),
      timestamp: new Date()
    }]);
    
  } catch (error) {
    console.error('Failed to send message:', error);
    toast.error('Failed to send message');
  } finally {
    setIsTyping(false);
  }
};
```

---

## Example 6: Gamification Updates

### Before (localStorage):

```tsx
// Old - updating XP, coins, etc.
const updateGamification = () => {
  const profile = JSON.parse(localStorage.getItem('studentProfile') || '{}');
  profile.xp += 10;
  profile.coins += 5;
  
  if (profile.xp >= profile.level * 100) {
    profile.level += 1;
    profile.xp = 0;
  }
  
  localStorage.setItem('studentProfile', JSON.stringify(profile));
  setStudentData(profile);
};
```

### After (Flask API):

```tsx
// New - updating XP, coins, etc.
import { updateGamification, getProfile } from '../services/api';

const updateGameStats = async () => {
  try {
    // Calculate new values
    const newXp = studentData.xp + 10;
    const newCoins = studentData.coins + 5;
    let newLevel = studentData.level;
    let finalXp = newXp;
    
    if (newXp >= studentData.level * 100) {
      newLevel += 1;
      finalXp = 0;
    }
    
    // Update on backend
    await updateGamification({
      xp: finalXp,
      level: newLevel,
      coins: newCoins
    });
    
    // Refresh profile
    const updatedProfile = await getProfile();
    setStudentData(updatedProfile);
    
    toast.success('Great job! +10 XP, +5 coins');
  } catch (error) {
    console.error('Failed to update stats:', error);
    toast.error('Failed to update progress');
  }
};
```

---

## Common Patterns

### Pattern 1: Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

const loadData = async () => {
  setIsLoading(true);
  try {
    const data = await getProfile();
    setData(data);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

// In JSX
{isLoading ? <Spinner /> : <Content data={data} />}
```

### Pattern 2: Error Handling

```tsx
const [error, setError] = useState<string | null>(null);

const saveData = async () => {
  setError(null);
  try {
    await createProfile(formData);
  } catch (err) {
    setError(err.message);
    toast.error('Failed to save');
  }
};

// In JSX
{error && <Alert variant="destructive">{error}</Alert>}
```

### Pattern 3: Optimistic Updates

```tsx
// Update UI immediately, then sync to backend
const updateData = async (newData) => {
  // 1. Update UI optimistically
  setData(newData);
  
  try {
    // 2. Save to backend
    await api.post('/data', newData);
  } catch (error) {
    // 3. Revert on error
    setData(oldData);
    toast.error('Update failed');
  }
};
```

### Pattern 4: Polling (Auto-refresh)

```tsx
useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const fresh = await getProfile();
      setProfile(fresh);
    } catch (error) {
      // Silent fail for background updates
    }
  }, 30000); // Every 30 seconds

  return () => clearInterval(interval);
}, []);
```

---

## Complete Component Example

Here's a complete example of a component using the API:

```tsx
import { useState, useEffect } from 'react';
import { getProfile, updateGamification } from '../services/api';
import { toast } from 'sonner@2.0.3';
import { Loader } from 'lucide-react';

export function ProfileCard() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const earnXP = async (amount: number) => {
    if (!profile) return;

    try {
      const newXp = profile.xp + amount;
      
      await updateGamification({
        xp: newXp,
        coins: profile.coins + Math.floor(amount / 2)
      });
      
      // Refresh profile
      await loadProfile();
      
      toast.success(`Earned ${amount} XP!`);
    } catch (err) {
      toast.error('Failed to update XP');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        Error: {error}
      </div>
    );
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className="card">
      <h2>{profile.name}</h2>
      <p>Level {profile.level}</p>
      <p>{profile.xp} XP</p>
      <p>{profile.coins} Coins</p>
      
      <button onClick={() => earnXP(10)}>
        Complete Task (+10 XP)
      </button>
    </div>
  );
}
```

---

## Migration Checklist

For each component that uses localStorage:

- [ ] Import API functions from `../services/api`
- [ ] Replace `localStorage.getItem()` with API `get` calls
- [ ] Replace `localStorage.setItem()` with API `post/put` calls
- [ ] Add `async/await` to functions
- [ ] Add try/catch error handling
- [ ] Add loading states
- [ ] Add error states
- [ ] Test component thoroughly
- [ ] Remove old localStorage code

---

## Testing Tips

1. **Test with DevTools:**
   - Open Network tab
   - See all API requests
   - Check request/response

2. **Test Error Cases:**
   - Stop Flask server
   - See error handling
   - Check user feedback

3. **Test Loading States:**
   - Throttle network (DevTools)
   - See loading indicators
   - Check UX

4. **Test Edge Cases:**
   - Empty data
   - Invalid tokens
   - Network failures

---

## Summary

**Key Changes:**
1. Import API functions instead of using localStorage
2. Make functions `async`
3. Use `await` for API calls
4. Add error handling
5. Add loading states
6. Provide user feedback (toasts)

**Benefits:**
- ✅ Data persists across devices
- ✅ Better error handling
- ✅ User accounts
- ✅ Real-time sync
- ✅ Scalable architecture

Your components will work the same way from a user perspective, but now with backend persistence!
