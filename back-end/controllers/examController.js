const Exam = require('../models/Exam');
const csvParser = require('csv-parser');
const axios = require('axios'); // ✅ For downloading CSV from Cloudinary
const stream = require('stream');

// ✅ Create a new exam
exports.createExam = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Add questions manually
exports.addQuestions = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        exam.questions.push(...req.body.questions);
        if (exam.isShuffled) {
            exam.questions.sort(() => Math.random() - 0.5);
        }
        await exam.save();
        res.status(200).json({ message: 'Questions added successfully', exam });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Upload questions via CSV (Cloudinary)
exports.uploadQuestionsCSV = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'No CSV file uploaded' });
        }

        const cloudinaryUrl = req.file.path; // ✅ Cloudinary URL from multer
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        // ✅ Download CSV from Cloudinary using Axios
        const response = await axios({
            method: 'get',
            url: cloudinaryUrl,
            responseType: 'stream' // ✅ Important for CSV processing
        });

        const questions = [];
        const csvStream = response.data.pipe(csvParser());

        csvStream.on('data', (row) => {
            questions.push({
                question: row.question,
                options: row.options.split(';'),
                correctAnswer: row.correctAnswer,
                marks: parseInt(row.marks, 10),
                difficulty: row.difficulty,
                explanation: row.explanation
            });
        });

        csvStream.on('end', async () => {
            exam.questions.push(...questions);
            await exam.save();
            res.status(200).json({ message: 'Questions uploaded successfully', exam });
        });

        csvStream.on('error', (err) => {
            res.status(500).json({ error: 'Error processing CSV file' });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get a specific exam
exports.getExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Submit exam and calculate score
exports.submitExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const { answers, userId } = req.body;

        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        let score = 0;
        exam.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score += question.marks;
            } else if (exam.negativeMarking) {
                score -= question.marks * 0.25;
            }
        });

        const result = {
            userId,
            examId,
            score,
            status: score >= exam.passingMarks ? 'Passed' : 'Failed'
        };

        res.status(200).json({ message: 'Exam submitted successfully', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Control exam access (with access code & expiry check)
exports.controlExamAccess = async (req, res) => {
    try {
        const { examId } = req.params;
        const { userId, accessCode } = req.body;

        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });

        if (exam.accessCode && exam.accessCode !== accessCode) {
            return res.status(403).json({ message: 'Invalid access code' });
        }

        if (exam.expiryDate && new Date() > new Date(exam.expiryDate)) {
            return res.status(403).json({ message: 'Exam has expired' });
        }

        res.status(200).json({ message: 'Access granted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
