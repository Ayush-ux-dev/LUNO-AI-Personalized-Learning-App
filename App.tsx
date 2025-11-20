import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './components/LoginPage';
import { StudentOnboarding } from './components/StudentOnboarding';
import { MoodSelector } from './components/MoodSelector';
import { RobotWelcomeAnimation } from './components/RobotWelcomeAnimation';
import { BottomNavigation } from './components/BottomNavigation';
import { FloatingChatbot } from './components/FloatingChatbot';
import { HomeExplore } from './components/HomeExplore';
import { MeProfile } from './components/MeProfile';
import { Store } from './components/Store';
import { AR3DLab } from './components/AR3DLab';
import { ProjectDNANew } from './components/ProjectDNANew';
import { Notes } from './components/Notes';
import { Tests } from './components/Tests';
import { Doubts } from './components/Doubts';
import { ExamPrep } from './components/ExamPrep';
import { DarkModeToggle } from './components/DarkModeToggle';
import { Toaster } from './components/Toaster';
import { Flame } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [showRobotWelcome, setShowRobotWelcome] = useState(false);
  const [hasMoodSelected, setHasMoodSelected] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'me' | 'store'>('home');
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);

  useEffect(() => {
    // Check if splash was shown before
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }

    // Check if user is logged in
    const loginData = localStorage.getItem('userLogin');
    if (loginData) {
      setIsLoggedIn(true);
      
      // Check if student has completed onboarding
      const storedData = localStorage.getItem('studentProfile');
      if (storedData) {
        const data = JSON.parse(storedData);
        setStudentData(data);
        setIsOnboarded(true);
        
        // Check if mood was selected today
        const today = new Date().toDateString();
        const lastMoodDate = localStorage.getItem('lastMoodDate');
        if (lastMoodDate === today) {
          setHasMoodSelected(true);
        }
        
        // Check for streak milestone
        if (data.streak && data.streak % 7 === 0) {
          setShowStreakAnimation(true);
          setTimeout(() => setShowStreakAnimation(false), 3000);
        }
      }
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  const handleLogin = (email: string, password: string) => {
    const loginData = {
      email,
      password,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('userLogin', JSON.stringify(loginData));
    setIsLoggedIn(true);
  };

  const handleOnboardingComplete = (data: any) => {
    const enhancedData = {
      ...data,
      level: 1,
      xp: 0,
      streak: 0,
      coins: 100,
      unlockedAchievements: []
    };
    localStorage.setItem('studentProfile', JSON.stringify(enhancedData));
    setStudentData(enhancedData);
    setIsOnboarded(true);
    setShowRobotWelcome(true);
  };

  const handleRobotWelcomeComplete = () => {
    setShowRobotWelcome(false);
  };

  const handleMoodSelected = (mood: string) => {
    // Save mood and date
    const today = new Date().toDateString();
    localStorage.setItem('lastMoodDate', today);
    localStorage.setItem('currentMood', mood);
    
    // Update student data with mood
    if (studentData) {
      const updatedData = { ...studentData, currentMood: mood };
      localStorage.setItem('studentProfile', JSON.stringify(updatedData));
      setStudentData(updatedData);
    }
    
    setHasMoodSelected(true);
  };

  // Show splash screen on first load
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show onboarding if logged in but not onboarded
  if (!isOnboarded) {
    return <StudentOnboarding onComplete={handleOnboardingComplete} />;
  }

  // Show robot welcome animation after onboarding
  if (showRobotWelcome) {
    return <RobotWelcomeAnimation studentName={studentData?.name} onComplete={handleRobotWelcomeComplete} />;
  }

  // Show mood selector if onboarded but mood not selected today
  if (!hasMoodSelected) {
    return <MoodSelector onMoodSelected={handleMoodSelected} studentName={studentData?.name} />;
  }

  const streak = studentData?.streak || 0;

  return (
    <div className="app-container">
      {/* Dark Mode Toggle */}
      <div className="app-dark-mode-toggle">
        <DarkModeToggle />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="bg-blob bg-blob-indigo"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="bg-blob bg-blob-indigo"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Dark Mode Floating Numbers */}
        <div className="dark-mode-numbers">
          {[...Array(30)].map((_, i) => {
            const numbers = ['0', '1', '01', '10', '001', '101', '110', '011', 'π', 'Σ', '∞', 'α', 'β', 'γ', 'Δ', '∫', '∂', '√', 'λ', 'μ'];
            const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
            return (
              <motion.div
                key={i}
                className="floating-number"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${12 + Math.random() * 16}px`,
                  opacity: 0.1 + Math.random() * 0.15,
                }}
                animate={{
                  y: [0, -100 - Math.random() * 200, 0],
                  x: [-20 + Math.random() * 40, 20 - Math.random() * 40, -20 + Math.random() * 40],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 15 + Math.random() * 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              >
                {randomNum}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Streak Celebration Animation */}
      <AnimatePresence>
        {showStreakAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="streak-celebration"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <Flame className="icon-xl" style={{ width: '5rem', height: '5rem', color: '#f97316', margin: '0 auto 1rem' }} />
            </motion.div>
            <h2 className="text-gray-900 dark:text-white mb-2">🎉 {streak} Day Streak!</h2>
            <p className="text-gray-600 dark:text-gray-400">You're on fire! Keep it up!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Show content based on current feature or active tab */}
          {currentFeature ? (
            <div>
              {currentFeature === 'ar-lab' && <AR3DLab onBack={() => setCurrentFeature(null)} />}
              {currentFeature === 'exam-prep' && <ExamPrep studentData={studentData} onBack={() => setCurrentFeature(null)} />}
              {currentFeature === 'project-dna' && <ProjectDNANew onBack={() => setCurrentFeature(null)} />}
              {currentFeature === 'notes' && <Notes onBack={() => setCurrentFeature(null)} />}
              {currentFeature === 'tests' && <Tests onBack={() => setCurrentFeature(null)} />}
              {currentFeature === 'doubts' && <Doubts onBack={() => setCurrentFeature(null)} />}
            </div>
          ) : (
            <div>
              {activeTab === 'home' && (
                <HomeExplore onFeatureSelect={(feature) => setCurrentFeature(feature)} />
              )}
              {activeTab === 'me' && (
                <MeProfile 
                  userData={studentData} 
                  onLogout={() => {
                    localStorage.removeItem('userLogin');
                    localStorage.removeItem('studentProfile');
                    setIsLoggedIn(false);
                    setIsOnboarded(false);
                    setHasMoodSelected(false);
                  }}
                  onDeleteAccount={() => {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    setIsOnboarded(false);
                    setHasMoodSelected(false);
                  }}
                />
              )}
              {activeTab === 'store' && <Store />}
            </div>
          )}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentFeature(null); // Reset feature when changing tabs
        }}
      />

      {/* Floating Chatbot */}
      <FloatingChatbot />
      
      <Toaster />
    </div>
  );
}
