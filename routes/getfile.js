const express = require('express')
const File = require('../models/file')
const getFile = express.Router()
getFile.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid })
        if (!file) {
            return res.json({
                message: 'Link has been expired'
            })
        }
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/filedownload/${file.uuid}`
        })
    }
    catch (err) {
        res.send(err);
    }
})
getFile.post('/send', async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body;
    if (!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required' });
    }

    try {
        const file = await File.findOne({ uuid: uuid });
        if (file.sender) {
            return res.status(422).send({ error: 'Email already sent once.' });
        }
        file.sender = emailFrom;
        file.receiver = emailTo;
        
        // send Email
        const sendMail = require('../mailService');
        sendMail({
            from: emailFrom,
            to: emailTo,
            subject: 'hot-drop file sharing',
            text: `${emailFrom} shared a file with you.`,
            html: require('../views/emailTemplate')({
                emailFrom,
                downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
                size: parseInt(file.size / 1000) + ' KB',
                expires: '24 hours'
            })
        }).then(() => {
            return res.json({ success: true });
        }).catch(err => {
            return res.status(500).json({ error: 'Error in email sending.' });
        });
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
})

module.exports = getFile