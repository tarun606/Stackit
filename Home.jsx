import React, { useState, useEffect } from 'react';
import { Bell, User, LogIn, LogOut, Plus, ChevronUp, ChevronDown, Check, MessageCircle, Tag, Search, Edit3, Bold, Italic, Strikethrough, List, ListOrdered, Link, Image, AlignLeft, AlignCenter, AlignRight, Smile } from 'lucide-react';

const StackIt = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentView, setCurrentView] = useState('home');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showAskQuestion, setShowAskQuestion] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [users, setUsers] = useState([]);

    // Sample data
    useEffect(() => {
        // Initialize with sample users
        const sampleUsers = [
            { id: 1, username: 'john_doe', password: 'password123', email: 'john@example.com', role: 'user' },
            { id: 2, username: 'security_expert', password: 'securepass', email: 'expert@example.com', role: 'user' },
            { id: 3, username: 'react_dev', password: 'reactpass', email: 'dev@example.com', role: 'user' },
            { id: 4, username: 'react_newbie', password: 'newbie123', email: 'newbie@example.com', role: 'user' },
            { id: 5, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' }
        ];
        setUsers(sampleUsers);

        const sampleQuestions = [
            {
                id: 1,
                title: "How to implement JWT authentication in React?",
                description: "I'm trying to implement JWT authentication in my React app but I'm not sure about the best practices. Should I store the token in localStorage or cookies?",
                author: "john_doe",
                tags: ["React", "JWT", "Authentication"],
                votes: 5,
                answers: [
                    {
                        id: 1,
                        content: "For JWT storage, cookies with httpOnly flag are generally more secure than localStorage. Here's why:\n\n1. **HttpOnly cookies** prevent XSS attacks\n2. **Secure flag** ensures HTTPS-only transmission\n3. **SameSite attribute** prevents CSRF attacks",
                        author: "security_expert",
                        votes: 8,
                        accepted: true,
                        createdAt: new Date('2024-01-15T10:30:00')
                    },
                    {
                        id: 2,
                        content: "You can also use sessionStorage as a middle ground. It's cleared when the browser tab closes, which adds some security benefits.",
                        author: "react_dev",
                        votes: 3,
                        accepted: false,
                        createdAt: new Date('2024-01-15T11:00:00')
                    }
                ],
                createdAt: new Date('2024-01-15T09:00:00')
            },
            {
                id: 2,
                title: "Best practices for React state management?",
                description: "What are the current best practices for managing state in large React applications? Context API vs Redux vs Zustand?",
                author: "react_newbie",
                tags: ["React", "State Management", "Redux"],
                votes: 12,
                answers: [],
                createdAt: new Date('2024-01-14T15:20:00')
            }
        ];
        setQuestions(sampleQuestions);

        const sampleNotifications = [
            {
                id: 1,
                message: "security_expert answered your question about JWT authentication",
                read: false,
                createdAt: new Date('2024-01-15T10:35:00')
            },
            {
                id: 2,
                message: "react_dev also answered your question",
                read: false,
                createdAt: new Date('2024-01-15T11:05:00')
            }
        ];
        setNotifications(sampleNotifications);
        setUnreadCount(sampleNotifications.filter(n => !n.read).length);
    }, []);

    const RichTextEditor = ({ value, onChange, placeholder }) => {
        const [content, setContent] = useState(value || '');
        const [showToolbar, setShowToolbar] = useState(false);

        const handleContentChange = (e) => {
            const newContent = e.target.value;
            setContent(newContent);
            onChange(newContent);
        };

        const formatText = (command) => {
            const textarea = document.activeElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = content.substring(start, end);

            let formattedText = selectedText;
            switch (command) {
                case 'bold':
                    formattedText = `**${selectedText}**`;
                    break;
                case 'italic':
                    formattedText = `*${selectedText}*`;
                    break;
                case 'strikethrough':
                    formattedText = `~~${selectedText}~~`;
                    break;
                case 'link':
                    formattedText = `[${selectedText || 'Link Text'}](URL)`;
                    break;
                case 'image':
                    formattedText = `![Alt text](Image URL)`;
                    break;
                case 'list':
                    formattedText = `\n- ${selectedText || 'List item'}`;
                    break;
                case 'numbered':
                    formattedText = `\n1. ${selectedText || 'List item'}`;
                    break;
                case 'emoji':
                    formattedText = `${selectedText}😊`;
                    break;
            }

            const newContent = content.substring(0, start) + formattedText + content.substring(end);
            setContent(newContent);
            onChange(newContent);
        };

        return (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                    <button
                        type="button"
                        onClick={() => formatText('bold')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Bold"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => formatText('italic')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Italic"
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => formatText('strikethrough')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Strikethrough"
                    >
                        <Strikethrough size={16} />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button
                        type="button"
                        onClick={() => formatText('list')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Bullet List"
                    >
                        <List size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => formatText('numbered')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Numbered List"
                    >
                        <ListOrdered size={16} />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button
                        type="button"
                        onClick={() => formatText('link')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Link"
                    >
                        <Link size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => formatText('image')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Image"
                    >
                        <Image size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => formatText('emoji')}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Emoji"
                    >
                        <Smile size={16} />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button
                        type="button"
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        type="button"
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        type="button"
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Align Right"
                    >
                        <AlignRight size={16} />
                    </button>
                </div>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder={placeholder}
                    className="w-full p-3 min-h-32 resize-none focus:outline-none"
                    onFocus={() => setShowToolbar(true)}
                />
            </div>
        );
    };

    const TagInput = ({ tags, onChange }) => {
        const [inputValue, setInputValue] = useState('');
        const [availableTags] = useState(['React', 'JavaScript', 'Node.js', 'Python', 'JWT', 'Authentication', 'State Management', 'Redux', 'CSS', 'HTML' ,'JAVA', 'Express.js', 'MongoDB', 'Ruby on Rails', 'C++', 'C#', 'Cloud Computing']);

        const addTag = (tag) => {
            if (tag && !tags.includes(tag)) {
                onChange([...tags, tag]);
            }
            setInputValue('');
        };

        const removeTag = (tagToRemove) => {
            onChange(tags.filter(tag => tag !== tagToRemove));
        };

        const filteredTags = availableTags.filter(tag =>
            tag.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(tag)
        );

        return (
            <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTag(inputValue);
                            }
                        }}
                        placeholder="Add tags..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {inputValue && filteredTags.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                            {filteredTags.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => addTag(tag)}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const QuestionCard = ({ question, onClick }) => (
        <div
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            onClick={() => onClick(question)}
        >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{question.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{question.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>by {question.author}</span>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <ChevronUp size={16} />
                        {question.votes}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        {question.answers.length}
                    </span>
                    <span>{question.createdAt.toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );

    const AnswerCard = ({ answer, questionAuthor, onVote, onAccept, canAccept }) => (
        <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${answer.accepted ? 'border-green-500' : 'border-gray-200'}`}>
            <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => onVote(answer.id, 'up')}
                        className="p-1 hover:bg-gray-100 rounded"
                        disabled={!currentUser}
                    >
                        <ChevronUp size={20} className="text-gray-600" />
                    </button>
                    <span className="text-lg font-semibold">{answer.votes}</span>
                    <button
                        onClick={() => onVote(answer.id, 'down')}
                        className="p-1 hover:bg-gray-100 rounded"
                        disabled={!currentUser}
                    >
                        <ChevronDown size={20} className="text-gray-600" />
                    </button>
                    {canAccept && (
                        <button
                            onClick={() => onAccept(answer.id)}
                            className={`p-1 rounded ${answer.accepted ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                            title={answer.accepted ? 'Accepted Answer' : 'Accept Answer'}
                        >
                            <Check size={20} />
                        </button>
                    )}
                </div>
                <div className="flex-1">
                    <div className="prose max-w-none mb-4">
                        <p className="whitespace-pre-wrap">{answer.content}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>by {answer.author}</span>
                        <span>{answer.createdAt.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const AskQuestionForm = ({ onSubmit, onCancel }) => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [tags, setTags] = useState([]);

        const handleSubmit = (e) => {
            e.preventDefault();
            if (title.trim() && description.trim() && tags.length > 0) {
                onSubmit({
                    title: title.trim(),
                    description: description.trim(),
                    tags
                });
                setTitle('');
                setDescription('');
                setTags([]);
            }
        };

        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask a Question</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Short and descriptive title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <RichTextEditor
                            value={description}
                            onChange={setDescription}
                            placeholder="Describe your question in detail..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <TagInput tags={tags} onChange={setTags} />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Post Question
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const QuestionDetailView = ({ question }) => {
        const [newAnswer, setNewAnswer] = useState('');
        const [showAnswerForm, setShowAnswerForm] = useState(false);

        const handleAnswerSubmit = (e) => {
            e.preventDefault();
            if (newAnswer.trim() && currentUser) {
                const answer = {
                    id: Date.now(),
                    content: newAnswer,
                    author: currentUser.username,
                    votes: 0,
                    accepted: false,
                    createdAt: new Date()
                };

                const updatedQuestions = questions.map(q =>
                    q.id === question.id
                        ? { ...q, answers: [...q.answers, answer] }
                        : q
                );
                setQuestions(updatedQuestions);
                setNewAnswer('');
                setShowAnswerForm(false);

                // Add notification for question author
                if (question.author !== currentUser.username) {
                    const notification = {
                        id: Date.now(),
                        message: `${currentUser.username} answered your question: "${question.title}"`,
                        read: false,
                        createdAt: new Date()
                    };
                    setNotifications(prev => [notification, ...prev]);
                    setUnreadCount(prev => prev + 1);
                }
            }
        };

        const handleVote = (answerId, direction) => {
            if (!currentUser) return;

            const updatedQuestions = questions.map(q =>
                q.id === question.id
                    ? {
                        ...q,
                        answers: q.answers.map(a =>
                            a.id === answerId
                                ? { ...a, votes: a.votes + (direction === 'up' ? 1 : -1) }
                                : a
                        )
                    }
                    : q
            );
            setQuestions(updatedQuestions);
        };

        const handleAcceptAnswer = (answerId) => {
            if (!currentUser || currentUser.username !== question.author) return;

            const updatedQuestions = questions.map(q =>
                q.id === question.id
                    ? {
                        ...q,
                        answers: q.answers.map(a =>
                            a.id === answerId
                                ? { ...a, accepted: true }
                                : { ...a, accepted: false }
                        )
                    }
                    : q
            );
            setQuestions(updatedQuestions);
        };

        return (
            <div className="space-y-6">
                <button
                    onClick={() => setCurrentView('home')}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                    ← Back to questions
                </button>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
                    <div className="prose max-w-none mb-6">
                        <p className="whitespace-pre-wrap text-gray-700">{question.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map(tag => (
                            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Asked by {question.author}</span>
                        <span>{question.createdAt.toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
                    </h2>

                    {question.answers
                        .sort((a, b) => {
                            if (a.accepted && !b.accepted) return -1;
                            if (!a.accepted && b.accepted) return 1;
                            return b.votes - a.votes;
                        })
                        .map(answer => (
                            <AnswerCard
                                key={answer.id}
                                answer={answer}
                                questionAuthor={question.author}
                                onVote={handleVote}
                                onAccept={handleAcceptAnswer}
                                canAccept={currentUser && currentUser.username === question.author}
                            />
                        ))}
                </div>

                {currentUser && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
                        <form onSubmit={handleAnswerSubmit} className="space-y-4">
                            <RichTextEditor
                                value={newAnswer}
                                onChange={setNewAnswer}
                                placeholder="Write your answer..."
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Post Answer
                            </button>
                        </form>
                    </div>
                )}
            </div>
        );
    };

    const LoginForm = ({ onLogin, onCancel, onSwitchToRegister }) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setIsLoading(true);

            if (!username.trim() || !password.trim()) {
                setError('Please enter both username and password');
                setIsLoading(false);
                return;
            }

            // Simulate API call delay
            setTimeout(() => {
                const user = users.find(u => u.username === username.trim() && u.password === password);

                if (user) {
                    onLogin({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    });
                    setUsername('');
                    setPassword('');
                } else {
                    setError('Invalid username or password');
                }
                setIsLoading(false);
            }, 500);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Login to StackIt</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isLoading}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={onSwitchToRegister}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Register here
                            </button>
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Demo Accounts:</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <div>User: <code className="bg-white px-1 rounded">john_doe</code> / <code className="bg-white px-1 rounded">password123</code></div>
                            <div>Admin: <code className="bg-white px-1 rounded">admin</code> / <code className="bg-white px-1 rounded">admin123</code></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const RegisterForm = ({ onRegister, onCancel, onSwitchToLogin }) => {
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [error, setError] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setIsLoading(true);

            // Validation
            if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
                setError('Please fill in all fields');
                setIsLoading(false);
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setIsLoading(false);
                return;
            }

            if (password.length < 6) {
                setError('Password must be at least 6 characters long');
                setIsLoading(false);
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Please enter a valid email address');
                setIsLoading(false);
                return;
            }

            // Check if username already exists
            if (users.some(u => u.username === username.trim())) {
                setError('Username already exists');
                setIsLoading(false);
                return;
            }

            // Check if email already exists
            if (users.some(u => u.email === email.trim())) {
                setError('Email already registered');
                setIsLoading(false);
                return;
            }

            // Simulate API call delay
            setTimeout(() => {
                const newUser = {
                    id: Date.now(),
                    username: username.trim(),
                    email: email.trim(),
                    password: password,
                    role: 'user'
                };

                setUsers(prev => [...prev, newUser]);
                onRegister({
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                });

                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setIsLoading(false);
            }, 500);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Register for StackIt</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password (min 6 characters)"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Creating Account...' : 'Register'}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isLoading}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Login here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const NotificationDropdown = () => (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-4 text-gray-500 text-center">No notifications</div>
                ) : (
                    notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                            <p className="text-sm text-gray-700">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.createdAt.toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
            {notifications.length > 0 && (
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={() => {
                            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                            setUnreadCount(0);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Mark all as read
                    </button>
                </div>
            )}
        </div>
    );

    const handleLogin = (user) => {
        setCurrentUser(user);
        setShowLogin(false);
        setShowRegister(false);

        // Welcome notification
        const welcomeNotification = {
            id: Date.now(),
            message: `Welcome back, ${user.username}!`,
            read: false,
            createdAt: new Date()
        };
        setNotifications(prev => [welcomeNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
    };

    const handleRegister = (user) => {
        setCurrentUser(user);
        setShowLogin(false);
        setShowRegister(false);

        // Welcome notification for new user
        const welcomeNotification = {
            id: Date.now(),
            message: `Welcome to StackIt, ${user.username}! Start by asking your first question.`,
            read: false,
            createdAt: new Date()
        };
        setNotifications(prev => [welcomeNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const handleAskQuestion = (questionData) => {
        const newQuestion = {
            id: Date.now(),
            ...questionData,
            author: currentUser.username,
            votes: 0,
            answers: [],
            createdAt: new Date()
        };
        setQuestions([newQuestion, ...questions]);
        setShowAskQuestion(false);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setCurrentView('question');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1
                                className="text-2xl font-bold text-blue-600 cursor-pointer"
                                onClick={() => setCurrentView('home')}
                            >
                                StackIt
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {currentUser && (
                                <button
                                    onClick={() => setShowAskQuestion(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus size={20} />
                                    Ask Question
                                </button>
                            )}

                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="p-2 text-gray-600 hover:text-gray-900 relative"
                                >
                                    <Bell size={20} />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                                {showNotifications && <NotificationDropdown />}
                            </div>

                            {currentUser ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700">Hello, {currentUser.username}</span>
                                    {currentUser.role === 'admin' && (
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                            Admin
                                        </span>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-600 hover:text-gray-900 p-2"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="text-gray-600 hover:text-gray-900 p-2 flex items-center gap-2"
                                    >
                                        <LogIn size={20} />
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setShowRegister(true)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showAskQuestion ? (
                    <AskQuestionForm
                        onSubmit={handleAskQuestion}
                        onCancel={() => setShowAskQuestion(false)}
                    />
                ) : currentView === 'question' && selectedQuestion ? (
                    <QuestionDetailView question={selectedQuestion} />
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">All Questions</h2>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search questions..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {questions.map(question => (
                                <QuestionCard
                                    key={question.id}
                                    question={question}
                                    onClick={handleQuestionClick}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Login Modal */}
            {showLogin && (
                <LoginForm
                    onLogin={handleLogin}
                    onCancel={() => setShowLogin(false)}
                    onSwitchToRegister={() => {
                        setShowLogin(false);
                        setShowRegister(true);
                    }}
                />
            )}

            {/* Register Modal */}
            {showRegister && (
                <RegisterForm
                    onRegister={handleRegister}
                    onCancel={() => setShowRegister(false)}
                    onSwitchToLogin={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                    }}
                />
            )}
        </div>
    );
};

export default StackIt;
