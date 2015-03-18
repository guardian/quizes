import React from 'react';
import {countWhere} from './utils';
import find from 'lodash-node/modern/collection/find';
import any from 'lodash-node/modern/collection/any';
import map from 'lodash-node/modern/collection/map';
import classnames from 'classnames';

export class Answer extends React.Component {
    render() {
        const answered = this.props.isAnswered,
              {correct, isChosen} = this.props.answer;

        let icon;

        if (isChosen) {
            let symbol = correct ? <span>&#10004;</span> : <span>&#10007;</span>;
            icon = <span className={'quiz__answer-icon'}>{symbol}</span>;
        }
        
        return <div 
            data-link-name={"answer " + (this.props.index + 1)}
            className={classnames({
                'quiz__answer': true,
                'quiz__answer--answered': answered,
                'quiz__answer--correct': answered && correct,
                'quiz__answer--correct-chosen': answered && correct && isChosen,
                'quiz__answer--incorrect': answered && !correct,
                'quiz__answer--incorrect-chosen': answered && isChosen && !correct
            })}            
            onClick={answered ? null : this.props.chooseAnswer}>
            {icon}
            {this.props.answer.answer}
        </div>
    }
}

function isAnswered(question) {
    return any(question.multiChoiceAnswers, (a) => a.isChosen);
}

function isCorrect(question) {
    return any(question.multiChoiceAnswers, (a) => a.isChosen && a.correct);
}

export class Question extends React.Component {
    isAnswered() {
        return isAnswered(this.props.question);
    }

    isCorrect() {
        return isCorrect(this.props.question);
    }

    render() {
        const question = this.props.question,
              answers = question.multiChoiceAnswers;

        return <div data-link-name={"question " + (this.props.index + 1)} className={classnames({isAnswered: this.isAnswered()})}>
            <h4 className="quiz__question-header">
                <span className="quiz__question-number">{this.props.index + 1}.</span>
                <span className="quiz__question-text">{question.question}</span>
            </h4>
            <div>{
                map(
                    answers,
                    (answer, i) => <Answer answer={answer} isAnswered={this.isAnswered()} chooseAnswer={this.props.chooseAnswer.bind(null, answer)} index={i} key={i} />
                )                
            }</div>
        </div>
    }
}

export class EndMessage extends React.Component {
    render() {
        return <div className="quiz__end-message">
            <div className="quiz__score-message">You got <span className="quiz__score">{this.props.score}/{this.props.length}</span></div>

            <div className="quiz__bucket-message">{this.props.message}</div>
        </div>
    }
}

export class Share extends React.Component {
    render() {
        let message = this.props.message.replace(/_/, this.props.score).replace(/_/, this.props.length);

        let ourUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
        let twitterCampaign = '?CMP=share_result_tw';
        let dataLinkName = 'social results';
        let twitterHref = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(message) + '&url=' + encodeURIComponent(ourUrl + twitterCampaign)

        return <div className="quiz__share">
            <div>Challenge a friend</div>
            <a className="social__action social-icon-wrapper" data-link-name={dataLinkName} href={twitterHref} target="_blank" title="Twitter">
                <span className="rounded-icon social-icon social-icon--twitter">
                    <i className="i-share-twitter--white i"></i>
                </span>
            </a>

        </div>
    }
}

export class Quiz extends React.Component {
    constructor(props) {
        this.state = {
            questions: props.questions
        };
    }

    chooseAnswer(answer) {
        answer.isChosen = true;
        this.forceUpdate();
    }

    length() {
        return this.state.questions.length;
    }

    isFinished() {
        return this.progress() === this.length();
    }

    progress() {
        return countWhere(this.state.questions, isAnswered);
    }

    score() {
        return countWhere(this.state.questions, isCorrect);
    }

    endMessage() {
        const minScore = (g) => g.minScore === undefined ? Number.NEGATIVE_INFINITY : g.minScore,
              maxScore = (g) => g.maxScore === undefined ? Number.POSITIVE_INFINITY : g.maxScore,
              score = this.score(),
              message = find(
                  this.props.resultGroups,
                  (group) => score >= minScore(group) && score <= maxScore(group)
              );

        return message ? message : "Well done!";
    }

    render() {
        let endMessage;
        let shareButtons;

        if (this.isFinished()) {
            endMessage = <EndMessage score={this.score()}
                                     message={this.endMessage().title}
                                     length={this.length()}
                                     key="end_message" />
            shareButtons = <Share score={this.score()}
                                     message={this.endMessage().share}
                                     length={this.length()}
                                     key="share" />

        }
        
        return <div data-link-name="quiz" className="quiz">
            {
                map(
                    this.state.questions,
                    (question, i) => <Question question={question} chooseAnswer={this.chooseAnswer.bind(this)} index={i} key={i} />
                )
            }
            {
                endMessage
            }
            {
                shareButtons
            }
        </div>
    }
}
