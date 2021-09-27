module.exports.surveyTemplate = (survey) => {
  return `<html lang="en">
    <body>
        <div style="text-align: center;">
            <h3>I'd like your input!</h3>
            <p>Please answer the following question:</p>
            <p>${survey.body}</p>
            <div>
                <a href="${process.env.REDIRECT_DOMAIN}/api/surveys/thanks">Yes</a>
                <a href="${process.env.REDIRECT_DOMAIN}/api/surveys/thanks">No</a>
            </div>
        </div>
    </body>
</html>`;
};
