import { Job, User, Contract, Proposal } from '../types';

// Mutable arrays for CRUD simulation
export let MOCK_USERS: User[] = [
{
  id: 'u1',
  name: 'Admin User',
  email: 'admin@uni.edu',
  password: 'password123',
  avatar:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'admin',
  createdAt: '2023-01-01T00:00:00Z'
},
{
  id: 'u2',
  name: 'Sarah Professor',
  email: 'sarah@uni.edu',
  password: 'password123',
  avatar:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'client',
  title: 'Research Lead at UniLab',
  bio: 'Leading research projects in AI and Ethics.',
  createdAt: '2023-02-15T10:00:00Z'
},
{
  id: 'u3',
  name: 'David Student',
  email: 'david@uni.edu',
  password: 'password123',
  avatar:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'freelancer',
  title: 'CS Graduate Student',
  bio: 'Full stack developer specializing in React and Node.js.',
  skills: ['React', 'TypeScript', 'Node.js', 'Python'],
  createdAt: '2023-03-10T14:30:00Z'
},
{
  id: 'u4',
  name: 'Elena Design',
  email: 'elena@uni.edu',
  password: 'password123',
  avatar:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'client',
  title: 'Director of Student Arts',
  createdAt: '2023-04-05T09:15:00Z'
},
{
  id: 'u5',
  name: 'Marcus Coder',
  email: 'marcus@uni.edu',
  password: 'password123',
  avatar:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'freelancer',
  title: 'Engineering Undergraduate',
  skills: ['Java', 'C++', 'System Design'],
  createdAt: '2023-05-20T11:45:00Z'
},
{
  id: 'u6',
  name: 'Jessica Writer',
  email: 'jessica@uni.edu',
  password: 'password123',
  avatar:
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'freelancer',
  title: 'Journalism Major',
  skills: ['Copywriting', 'Editing', 'SEO'],
  createdAt: '2023-06-12T16:20:00Z'
}];


export let MOCK_JOBS: Job[] = [
{
  id: 'j1',
  title: 'Research Assistant for AI Ethics Study',
  description:
  'Looking for a CS or Philosophy student to assist with data collection and analysis for an ongoing study on AI ethics in higher education.',
  budget: 1500,
  budgetType: 'fixed',
  postedBy: 'u2',
  postedByName: 'Sarah Professor',
  postedAt: '2023-10-25T10:00:00Z',
  skills: ['Research', 'Data Analysis', 'Ethics'],
  status: 'open',
  proposalsCount: 2,
  duration: '3 months',
  experienceLevel: 'intermediate',
  flagged: false
},
{
  id: 'j2',
  title: 'Campus Event Poster Design',
  description:
  'Need a graphic design student to create a series of posters for the upcoming Spring Arts Festival. Must be familiar with Adobe Creative Suite.',
  budget: 300,
  budgetType: 'fixed',
  postedBy: 'u4',
  postedByName: 'Elena Design',
  postedAt: '2023-10-24T14:30:00Z',
  skills: ['Graphic Design', 'Illustrator', 'Photoshop'],
  status: 'open',
  proposalsCount: 5,
  duration: '2 weeks',
  experienceLevel: 'entry',
  flagged: false
},
{
  id: 'j3',
  title: 'Department Website Update',
  description:
  'The History department needs a student to update their WordPress site with new faculty bios and course descriptions.',
  budget: 25,
  budgetType: 'hourly',
  postedBy: 'u2',
  postedByName: 'Sarah Professor',
  postedAt: '2023-10-23T09:15:00Z',
  skills: ['WordPress', 'HTML', 'CSS'],
  status: 'in-progress',
  proposalsCount: 3,
  duration: '1 month',
  experienceLevel: 'intermediate',
  flagged: false
},
{
  id: 'j4',
  title: 'Tutoring App Prototype',
  description:
  'CS student needed to build a React Native prototype for a peer-to-peer tutoring application.',
  budget: 2000,
  budgetType: 'fixed',
  postedBy: 'u4',
  postedByName: 'Elena Design',
  postedAt: '2023-10-22T16:45:00Z',
  skills: ['React Native', 'Mobile Dev', 'UI/UX'],
  status: 'open',
  proposalsCount: 8,
  duration: '2 months',
  experienceLevel: 'expert',
  flagged: false
},
{
  id: 'j5',
  title: 'Thesis Proofreading & Editing',
  description:
  "Need a detail-oriented English major to proofread my master's thesis. Approx 80 pages.",
  budget: 400,
  budgetType: 'fixed',
  postedBy: 'u2',
  postedByName: 'Sarah Professor',
  postedAt: '2023-10-21T11:20:00Z',
  skills: ['Editing', 'Proofreading', 'Academic Writing'],
  status: 'open',
  proposalsCount: 1,
  duration: '1 week',
  experienceLevel: 'expert',
  flagged: false
},
{
  id: 'j6',
  title: 'Lab Data Entry Automation',
  description:
  'Biology lab needs a Python script to automate data entry from Excel sheets to our database.',
  budget: 500,
  budgetType: 'fixed',
  postedBy: 'u2',
  postedByName: 'Sarah Professor',
  postedAt: '2023-10-20T13:00:00Z',
  skills: ['Python', 'Automation', 'Excel'],
  status: 'completed',
  proposalsCount: 4,
  duration: '3 days',
  experienceLevel: 'intermediate',
  flagged: false
},
{
  id: 'j7',
  title: 'Suspicious Job Posting',
  description:
  'Make easy money fast! Just send us your bank details and we will transfer funds.',
  budget: 10000,
  budgetType: 'fixed',
  postedBy: 'u4',
  postedByName: 'Elena Design',
  postedAt: '2023-10-19T10:00:00Z',
  skills: ['None'],
  status: 'open',
  proposalsCount: 0,
  duration: '1 day',
  experienceLevel: 'entry',
  flagged: true
},
{
  id: 'j8',
  title: 'Student Union App Backend',
  description:
  'Backend developer needed to set up a Node.js API for the new Student Union events app.',
  budget: 40,
  budgetType: 'hourly',
  postedBy: 'u2',
  postedByName: 'Sarah Professor',
  postedAt: '2023-10-18T15:30:00Z',
  skills: ['Node.js', 'Express', 'PostgreSQL'],
  status: 'open',
  proposalsCount: 6,
  duration: '3 months',
  experienceLevel: 'expert',
  flagged: false
}];


export let MOCK_PROPOSALS: Proposal[] = [
{
  id: 'p1',
  jobId: 'j1',
  jobTitle: 'Research Assistant for AI Ethics Study',
  freelancerId: 'u3',
  freelancerName: 'David Student',
  coverLetter:
  'I am very interested in AI ethics and have taken several relevant courses.',
  bidAmount: 1500,
  status: 'pending',
  submittedAt: '2023-10-26T09:00:00Z'
},
{
  id: 'p2',
  jobId: 'j1',
  jobTitle: 'Research Assistant for AI Ethics Study',
  freelancerId: 'u5',
  freelancerName: 'Marcus Coder',
  coverLetter: 'I have experience with data analysis using Python.',
  bidAmount: 1400,
  status: 'pending',
  submittedAt: '2023-10-26T10:30:00Z'
},
{
  id: 'p3',
  jobId: 'j3',
  jobTitle: 'Department Website Update',
  freelancerId: 'u3',
  freelancerName: 'David Student',
  coverLetter:
  'I have built several WordPress sites for student organizations.',
  bidAmount: 25,
  status: 'accepted',
  submittedAt: '2023-10-24T11:00:00Z'
},
{
  id: 'p4',
  jobId: 'j6',
  jobTitle: 'Lab Data Entry Automation',
  freelancerId: 'u5',
  freelancerName: 'Marcus Coder',
  coverLetter: 'I can write this script in a few hours.',
  bidAmount: 500,
  status: 'accepted',
  submittedAt: '2023-10-20T14:00:00Z'
},
{
  id: 'p5',
  jobId: 'j2',
  jobTitle: 'Campus Event Poster Design',
  freelancerId: 'u6',
  freelancerName: 'Jessica Writer',
  coverLetter: 'I have a minor in graphic design and would love to help.',
  bidAmount: 250,
  status: 'pending',
  submittedAt: '2023-10-25T16:00:00Z'
}];


export let MOCK_CONTRACTS: Contract[] = [
{
  id: 'c1',
  jobId: 'j3',
  jobTitle: 'Department Website Update',
  clientId: 'u2',
  clientName: 'Sarah Professor',
  freelancerId: 'u3',
  freelancerName: 'David Student',
  amount: 25,
  status: 'active',
  startDate: '2023-10-25T00:00:00Z',
  progress: 45,
  nextMilestone: 'Faculty Bios Page'
},
{
  id: 'c2',
  jobId: 'j6',
  jobTitle: 'Lab Data Entry Automation',
  clientId: 'u2',
  clientName: 'Sarah Professor',
  freelancerId: 'u5',
  freelancerName: 'Marcus Coder',
  amount: 500,
  status: 'completed',
  startDate: '2023-10-21T00:00:00Z',
  progress: 100
},
{
  id: 'c3',
  jobId: 'j99',
  jobTitle: 'Previous Semester Project',
  clientId: 'u4',
  clientName: 'Elena Design',
  freelancerId: 'u3',
  freelancerName: 'David Student',
  amount: 1200,
  status: 'completed',
  startDate: '2023-09-01T00:00:00Z',
  progress: 100
}];