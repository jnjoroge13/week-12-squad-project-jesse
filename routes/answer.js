const express = require("express");
const router = express.Router();
const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils.js");
const { check, validationResult } = require("express-validator");
const { requireAuth } = require('../auth');

const checkPermissions = (answer, currentUser) => {
    if (answer.userId !== currentUser.id) {
        const err = new Error('Illegal operation.');
        err.status = 403; // Forbidden
        throw err;
    }
};


router.get("/:questionId(\\d+)/create", csrfProtection, requireAuth, asyncHandler(async (req, res) => {
    const answer = await db.Answer.build();
    const questionId = parseInt(req.params.questionId, 10);
    res.render("answer-create", {
        answer,
        questionId,
        csrfToken: req.csrfToken(),
        title: "Submit an Answer"
    });
})
);
const answerValidators = [
    check("body")
        .exists({ checkFalsy: true })
        .withMessage("Please provide an answer")
];
router.post("/:questionId(\\d+)/create", csrfProtection, requireAuth, answerValidators, asyncHandler(async (req, res) => {
    const { questionId, body } = req.body;

    const answer = await db.Answer.build({
        questionId,
        body,
        userId: res.locals.user.id
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await answer.save();
        res.redirect('../../questions/' + questionId);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('answer-create', {
            title: "Submit an Answer",
            answer,
            questionId,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));
router.get("/:questionId(\\d+)", asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.questionId, 10);
    const answers = await db.Answer.findAll({where: { questionId: questionId } });
    res.render("answer-list", { title: "Answers", answers });
})
);
/*********************************************************/
router.get('/edit/:id(\\d+)', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const answerId = parseInt(req.params.id, 10);
        const answer = await db.Answer.findByPk(answerId);
        const questionId = answer.questionId
        console.log(answer)
        checkPermissions(answer, res.locals.user);

        res.render('answer-edit', {
            title: 'Edit Answer',
            answer,
            questionId,
            csrfToken: req.csrfToken(),
        });
    }));

router.post('/edit/:id(\\d+)', requireAuth, csrfProtection, answerValidators,
    asyncHandler(async (req, res) => {
        const answerId = parseInt(req.params.id, 10);
        const answerToUpdate = await db.Answer.findByPk(answerId);

        checkPermissions(answerToUpdate, res.locals.user);

        const {body, questionId} = req.body;

        const answer = {body, questionId, id:answerId};

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await answerToUpdate.update(answer);
            res.redirect('../../questions/' + questionId);
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            console.log(answer)
            res.render('answer-edit', {
                title: 'Edit answer',
                answer,
                questionId,
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    }));
//     const validatorErrors = validationResult(req);
    //     if (validatorErrors.isEmpty()) {
    //         await answerToUpdate.update(answer);
    //         res.redirect('../../questions/' + questionId);
    //     } else {
    //         const errors = validatorErrors.array().map((error) => error.msg);
    //         res.redirect('/answers/edit/'+answerId)
    //     }
    // }));
/*********************************************************/
router.get('/delete/:id(\\d+)', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const answerId = parseInt(req.params.id, 10);
        const answer = await db.Answer.findByPk(answerId);
        checkPermissions(answer, res.locals.user);

        res.render('answer-delete', {
            title: 'Delete Answer',
            answer,
            csrfToken: req.csrfToken(),
        });
    }));

router.post('/delete/:id(\\d+)', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const answerId = parseInt(req.params.id, 10);
        const answer = await db.Answer.findByPk(answerId);
        const questionId = answer.questionId
        checkPermissions(answer, res.locals.user);

        await answer.destroy();
        res.redirect('../../questions/' + questionId);
    }));
module.exports = router;
