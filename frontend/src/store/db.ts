export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  graduationYear: string;
  primaryInterest: string;
  referralCode: string; // The code this user generated for others
  referredBy: string | null; // The code this user used to register
  isAmbassador: boolean;
  createdAt: number;
}

export interface Registration {
  id: string;
  userId: string;
  source: string; // organic, referral, whatsapp_community, email, paid
  campaign: string;
  timestamp: number;
}

export interface AppState {
  users: User[];
  registrations: Registration[];
  pageViews: number;
  referralClicks: number;
  simulatorConfig: {
    ambassadors: number;
    reachPerAmbassador: number;
    shareRate: number;
    ctr: number;
    conversionRate: number;
    communities: number;
    communitySize: number;
    communityConvRate: number;
    emails: number;
    emailConvRate: number;
    paidBudget: number;
    paidCpa: number;
    overlapAdjustment: number;
  };
  budgetAllocations: {
    paid: number;
    creative: number;
    incentives: number;
    contingency: number;
  };
  abTests: {
    headline: 'A' | 'B';
    cta: 'A' | 'B';
  };
}

const DEFAULT_STATE: AppState = {
  users: [],
  registrations: [],
  pageViews: 1240,
  referralClicks: 320,
  simulatorConfig: {
    ambassadors: 25,
    reachPerAmbassador: 150,
    shareRate: 0.4,
    ctr: 0.15,
    conversionRate: 0.1,
    communities: 10,
    communitySize: 200,
    communityConvRate: 0.05,
    emails: 5000,
    emailConvRate: 0.02,
    paidBudget: 2000,
    paidCpa: 40,
    overlapAdjustment: 0.85, // 15% overlap
  },
  budgetAllocations: {
    paid: 1200,
    creative: 300,
    incentives: 400,
    contingency: 100,
  },
  abTests: {
    headline: 'A',
    cta: 'A',
  },
};

type Listener = () => void;
let listeners: Listener[] = [];

export const db = {
  getState: (): AppState => {
    const stored = localStorage.getItem('growth_engine_db');
    if (stored) {
      return JSON.parse(stored);
    }
    return DEFAULT_STATE;
  },

  setState: (newState: Partial<AppState> | ((prev: AppState) => Partial<AppState>)) => {
    const currentState = db.getState();
    const nextState = {
      ...currentState,
      ...(typeof newState === 'function' ? newState(currentState) : newState),
    };
    localStorage.setItem('growth_engine_db', JSON.stringify(nextState));
    listeners.forEach((l) => l());
  },

  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  reset: () => {
    localStorage.removeItem('growth_engine_db');
    listeners.forEach((l) => l());
  },

  // Helper actions
  registerUser: (userData: Omit<User, 'id' | 'referralCode' | 'createdAt' | 'isAmbassador'>, source: string) => {
    const state = db.getState();
    
    // Check duplicates
    if (state.users.some(u => u.email === userData.email || u.phone === userData.phone)) {
      throw new Error("Duplicate registration detected.");
    }

    const id = Math.random().toString(36).substr(2, 9);
    const referralCode = userData.name.substring(0, 3).toUpperCase() + Math.floor(1000 + Math.random() * 9000);
    
    const newUser: User = {
      ...userData,
      id,
      referralCode,
      isAmbassador: false,
      createdAt: Date.now()
    };

    const newReg: Registration = {
      id: Math.random().toString(36).substr(2, 9),
      userId: id,
      source: userData.referredBy ? 'referral' : source,
      campaign: 'workshop_q1',
      timestamp: Date.now()
    };

    db.setState({
      users: [...state.users, newUser],
      registrations: [...state.registrations, newReg]
    });

    return newUser;
  },
  
  becomeAmbassador: (userId: string) => {
    const state = db.getState();
    const updatedUsers = state.users.map(u => u.id === userId ? { ...u, isAmbassador: true } : u);
    db.setState({ users: updatedUsers });
  },

  loadPresentationState: () => {
    // Generate predictable 317 registrations for Day 4
    db.reset();
    
    const mockColleges = ['IIT Bombay', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'SRM Chennai', 'Manipal'];
    const users: User[] = [];
    const registrations: Registration[] = [];
    
    // Seed users (paid + organic)
    for(let i=0; i<124; i++) {
      const id = Math.random().toString(36).substr(2, 9);
      const isAmbassador = i < 40; // 40 ambassadors
      users.push({
        id,
        name: `Student ${i}`,
        email: `student${i}@example.com`,
        phone: `999000${String(i).padStart(4, '0')}`,
        college: mockColleges[Math.floor(Math.random() * mockColleges.length)],
        branch: 'CSE',
        graduationYear: '2024',
        primaryInterest: 'AI',
        referralCode: `STU${1000 + i}`,
        referredBy: null,
        isAmbassador,
        createdAt: Date.now() - (4 * 86400000)
      });
      registrations.push({
        id: Math.random().toString(36).substr(2, 9),
        userId: id,
        source: i < 30 ? 'paid' : (i < 80 ? 'organic' : 'email'),
        campaign: 'workshop_q1',
        timestamp: Date.now() - (4 * 86400000)
      });
    }

    // Referral users
    for(let i=124; i<317; i++) {
      const id = Math.random().toString(36).substr(2, 9);
      const referrer = users[Math.floor(Math.random() * 40)]; // Referred by ambassadors
      users.push({
        id,
        name: `Referred ${i}`,
        email: `ref${i}@example.com`,
        phone: `999111${String(i).padStart(4, '0')}`,
        college: referrer.college,
        branch: 'IT',
        graduationYear: '2025',
        primaryInterest: 'AI',
        referralCode: `REF${1000 + i}`,
        referredBy: referrer.referralCode,
        isAmbassador: false,
        createdAt: Date.now() - (2 * 86400000)
      });
      registrations.push({
        id: Math.random().toString(36).substr(2, 9),
        userId: id,
        source: 'referral',
        campaign: 'workshop_q1',
        timestamp: Date.now() - (2 * 86400000)
      });
    }

    db.setState({
      users,
      registrations,
      pageViews: 3400,
      budgetAllocations: {
        paid: 1200,
        creative: 300,
        incentives: 400,
        contingency: 100,
      }
    });
  }
};
