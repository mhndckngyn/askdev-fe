// mockData.ts
import { Notification } from '../types/notification';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'QUESTION_VOTE',
    message: 'đã upvote câu hỏi của bạn',
    user: {
      username: 'john_doe',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    contentTitle: 'Làm thế nào để optimize React performance?',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    isRead: false,
  },
  {
    id: '2',
    type: 'ANSWER',
    message: 'đã trả lời câu hỏi của bạn',
    user: {
      username: 'jane_smith',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    contentTitle: 'Best practices for Node.js API',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
  },
  {
    id: '3',
    type: 'COMMENT',
    message: 'đã bình luận về câu trả lời của bạn',
    user: {
      username: 'dev_master',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
    },
    contentTitle: 'Cách sử dụng Redux Toolkit hiệu quả',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true,
  },
  {
    id: '4',
    type: 'ANSWER_CHOSEN',
    message: 'đã chọn câu trả lời của bạn là tốt nhất',
    user: {
      username: 'tech_lead',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech',
    },
    contentTitle: 'Database indexing strategies',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    isRead: true,
  },
  {
    id: '5',
    type: 'ANSWER_VOTE',
    message: 'và 3 người khác đã upvote câu trả lời của bạn',
    user: {
      username: 'code_ninja',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja',
    },
    contentTitle: 'Microservices vs Monolith architecture',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isRead: false,
  },
  {
    id: '6',
    type: 'EDIT',
    message: 'đã chỉnh sửa câu trả lời của bạn',
    user: {
      username: 'moderator',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mod',
    },
    contentTitle: 'TypeScript advanced patterns',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    isRead: true,
  },
  {
    id: '7',
    type: 'REPORT',
    message: 'đã báo cáo bài viết của bạn',
    user: {
      username: 'admin',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    contentTitle: 'React hooks best practices',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isRead: false,
  },
  {
    id: '8',
    type: 'COMMENT',
    message: 'đã bình luận về câu hỏi của bạn',
    user: {
      username: 'frontend_dev',
      profilePicture:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Frontend',
    },
    contentTitle: 'CSS Grid vs Flexbox - Khi nào nên dùng?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15),
    isRead: true,
  },
  {
    id: '9',
    type: 'QUESTION_VOTE',
    message: 'đã upvote câu hỏi của bạn',
    user: {
      username: 'backend_guru',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Backend',
    },
    contentTitle: 'Làm sao để tối ưu Database Query?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
    isRead: false,
  },
  {
    id: '10',
    type: 'ANSWER',
    message: 'đã trả lời câu hỏi của bạn',
    user: {
      username: 'fullstack_pro',
      profilePicture:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Fullstack',
    },
    contentTitle: 'Microservices Authentication strategies',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
  },
  {
    id: '11',
    type: 'QUESTION_VOTE',
    message: 'đã upvote câu hỏi của bạn',
    user: {
      username: 'react_expert',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=React',
    },
    contentTitle: 'React 18 Concurrent Features',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
    isRead: false,
  },
  {
    id: '12',
    type: 'COMMENT',
    message: 'đã bình luận về câu trả lời của bạn',
    user: {
      username: 'vue_developer',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vue',
    },
    contentTitle: 'Vue 3 Composition API vs Options API',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
    isRead: true,
  },
  {
    id: '13',
    type: 'ANSWER_VOTE',
    message: 'và 5 người khác đã upvote câu trả lời của bạn',
    user: {
      username: 'angular_master',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Angular',
    },
    contentTitle: 'Angular vs React: Performance Comparison',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
    isRead: false,
  },
  {
    id: '14',
    type: 'ANSWER',
    message: 'đã trả lời câu hỏi của bạn',
    user: {
      username: 'python_guru',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Python',
    },
    contentTitle: 'Python FastAPI vs Django performance',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 32),
    isRead: true,
  },
  {
    id: '15',
    type: 'ANSWER_CHOSEN',
    message: 'đã chọn câu trả lời của bạn là tốt nhất',
    user: {
      username: 'devops_engineer',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevOps',
    },
    contentTitle: 'Docker vs Kubernetes: Khi nào dùng?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 34),
    isRead: false,
  },
];
