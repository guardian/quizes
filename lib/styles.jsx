export styles = <style>
.quiz {
    font-family: "Guardian Egyptian Web", "Guardian Text Egyptian Web", Georgia, serif;
    color: #767676;
}

.quiz__title {
    color: #333333; /* neutral-1 */
}

.quiz__question-header {
    color: #333333; /* neutral-1 */
    display: table;
}

.quiz__question-text {
    display: table-cell;
}

.quiz__question-number {
    display: table-cell;
    font-size: 18px;
    min-width: 24px;
    padding-right: 6px;
    text-align: right;
}

.quiz__answer {
    position: relative;
    cursor: pointer;
    color: #767676; /* neutral-2 */
    background-color: #f6f6f6; /* neutral-8 */
    padding: 12px 30px;
    margin-bottom: 12px;
}

.quiz__answer--answered {
    cursor: default;
}

.quiz__answer--correct {
    color: #333;
    background-color: #c6e8d0; /* ??? */
}

.quiz__answer--correct-chosen {
    background-color: #43B347; /* ??? */
    color: #ffffff;    
}

.quiz__answer--incorrect {
    color: #bdbdbd; /* neutral-3 */
}

.quiz__answer--incorrect-chosen {
    background-color: #BB001A; /* ??? */
    color: #ffffff;
}

.quiz__answer-icon {
    position: absolute;
    left: 6px;
    top: 5px;
    font-size: 26px;
}

.quiz__end-message {
    border-top: 1px solid #aad8f1; /* news-support-1 */
    background-color: #f6f6f6; /* neutral-8 */
    padding: 30px 12px 10px 12px;
}

.quiz__score-message {
    font-weight: 500;
    color: #333333; /* neutral-1 */
}

.quiz__score {
    font-size: 24px;
    margin-left: 4px;
}

.quiz__bucket-message {
    margin-top: 10px;
    margin-bottom: 24px;
}
</style>;