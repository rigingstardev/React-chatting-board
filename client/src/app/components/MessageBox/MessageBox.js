import React, { Component } from 'react';
import './MessageBox.css';
// import { Animated } from "react-animated-css";
import 'animate.css/animate.css';
import ReactHtmlParser from 'react-html-parser';

import PhotoMessage from '../PhotoMessage/PhotoMessage';
import FileMessage from '../FileMessage/FileMessage';
import SystemMessage from '../SystemMessage/SystemMessage';
import LocationMessage from '../LocationMessage/LocationMessage';
import SpotifyMessage from '../SpotifyMessage/SpotifyMessage';

import Avatar from '../Avatar/Avatar';

import { FaForward } from 'react-icons/fa';
import { IoIosDoneAll } from 'react-icons/io';
import { MdTimeline, MdCheck } from 'react-icons/md';
// import FaReply from 'react-icons/lib/fa/mail-reply';

const moment = require('moment');

const classNames = require('classnames');



// const htmlfly = function (text) {
//
//     String.prototype.split2 = function (expr, exp2) {
//
//         if (!this.includes(expr)) {
//             return arr;
//         }
//         var arr = [];
//         var word = "";
//         for (var i = 0; i < this.length; i++) {
//
//
//             if (this[i] == expr) {
//                 arr.push(word);
//                 word = "";
//                 arr.push(exp2 || expr);
//             } else {
//                 word += this[i]
//                 if ((i == this.length - 1)) {
//                     arr.push(word);
//
//                 }
//             }
//
//         }
//         return arr || [];
//     }
//
//     var arrx = text.split2(' ') || text.split(' ');
//     const exp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
//
//     for (var i = 0; i < arrx.length; i++) {
//
//         if (arrx[i].match(exp)) {
//             arrx[i] = <a key={i} href={arrx[i].match(exp)[0]} target="_blank">{arrx[i]}</a>
//         }
//     }
//     console.log(arrx);
//     return arrx;
// }


export class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
        this.myRef = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.focus == this.props.focus && nextProps.focus === true) {
            if (this.myRef) {
                this.myRef.current.scrollIntoView({ behavior: 'smooth' });
                this.props.onMessageFocused(nextProps);
            }
        }
    }

    render() {
        var positionCls = classNames('rce-mbox', { 'rce-mbox-right': this.props.position === 'right' });
        var thatAbsoluteTime = this.props.type !== 'text' && this.props.type !== 'file' && !(this.props.type === 'location' && this.props.text);


        const dateText = this.props.date && !isNaN(this.props.date) && (
            this.props.dateString ||
            moment(this.props.date).fromNow()
        );

        return (
            // <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
            <div ref={this.myRef}>
                <div
                    className={classNames('rce-container-mbox', this.props.className, this.props.position, 'animate__animated animate__bounceIn')}
                    onClick={this.props.onClick}>
                    {
                        (this.props.title || this.props.avatar) &&
                        <div
                            style={this.props.titleColor && { color: this.props.titleColor }}
                            onClick={this.props.onTitleClick}
                            className={classNames('rce-mbox-title', {
                                'rce-mbox-title--clear': this.props.type === 'text',
                            })}>
                            {
                                this.props.avatar &&
                                (React.isValidElement(this.props.avatar) ? this.props.avatar : <Avatar
                                    src={this.props.avatar} />)}

                            {
                                this.props.title &&
                                <span>{this.props.title}</span>
                            }
                        </div>
                    }
                    {
                        this.props.renderAddCmp instanceof Function &&
                        this.props.renderAddCmp()
                    }
                    {
                        this.props.type === 'system' ?
                            <SystemMessage
                                text={this.props.text} />
                            :
                            <div
                                className={classNames(
                                    positionCls,
                                    { 'rce-mbox--clear-padding': thatAbsoluteTime },
                                    { 'rce-mbox--clear-notch': !this.props.notch },
                                    { 'message-focus': this.props.focus },
                                )}>
                                <div className='rce-mbox-body'>
                                    {
                                        this.props.forwarded === true &&
                                        <div
                                            className={classNames(
                                                'rce-mbox-forward',
                                                { 'rce-mbox-forward-right': this.props.position === 'left' },
                                                { 'rce-mbox-forward-left': this.props.position === 'right' }
                                            )}
                                            onClick={this.props.onForwardClick}>
                                            <FaForward />
                                        </div>
                                    }

                                    {
                                        this.props.type === 'text' &&
                                        <div className={"rce-mbox-text"}>
                                            {ReactHtmlParser(this.props.text)}
                                        </div>
                                    }

                                    {
                                        this.props.type === 'location' &&
                                        <LocationMessage
                                            onOpen={this.props.onOpen}
                                            data={this.props.data}
                                            target={this.props.target}
                                            href={this.props.href}
                                            apiKey={this.props.apiKey}
                                            src={this.props.src}
                                            zoom={this.props.zoom}
                                            markerColor={this.props.markerColor}
                                            text={this.props.text} />
                                    }

                                    {
                                        this.props.type === 'photo' &&
                                        <PhotoMessage
                                            onOpen={this.props.onOpen}
                                            onDownload={this.props.onDownload}
                                            onLoad={this.props.onLoad}
                                            data={this.props.data}
                                            width={this.props.width}
                                            height={this.props.height}
                                            text={this.props.text} />
                                    }

                                    {
                                        this.props.type === 'file' &&
                                        <FileMessage
                                            onOpen={this.props.onOpen}
                                            onDownload={this.props.onDownload}
                                            data={this.props.data}
                                            text={this.props.text} />
                                    }

                                    {
                                        this.props.type === 'spotify' &&
                                        <SpotifyMessage
                                            width={this.props.width}
                                            height={this.props.height}
                                            theme={this.props.theme}
                                            view={this.props.view}
                                            data={this.props.data}
                                            uri={this.props.uri || this.props.text} />
                                    }
                                </div>
                                <div
                                    className={classNames(
                                        'rce-mbox-time',
                                        this.props.position,
                                        { 'rce-mbox-time-block': thatAbsoluteTime },
                                        { 'non-copiable': !this.props.copiableDate },
                                    )}
                                    data-text={this.props.copiableDate ? undefined : dateText}>
                                    {
                                        this.props.copiableDate &&
                                        this.props.date &&
                                        !isNaN(this.props.date) &&
                                        (
                                            this.props.dateString ||
                                            moment(this.props.date).fromNow()
                                        )
                                    }
                                    {
                                        this.props.status &&
                                        <span className='rce-mbox-status'>
                                            {
                                                this.props.status === 'waiting' &&
                                                <MdTimeline />
                                            }

                                            {
                                                this.props.status === 'sent' &&
                                                <MdCheck />
                                            }

                                            {
                                                this.props.status === 'received' &&
                                                <IoIosDoneAll />
                                            }

                                            {
                                                this.props.status === 'read' &&
                                                <IoIosDoneAll color='#4FC3F7' />
                                            }
                                        </span>
                                    }
                                </div>

                                {
                                    this.props.notch &&
                                    (this.props.position === 'right' ?
                                        <svg className={classNames(
                                            "rce-mbox-right-notch",
                                            { 'message-focus': this.props.focus },
                                        )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M0 0v15L15 7" />
                                        </svg>
                                        :
                                        <div>
                                            <svg className={classNames(
                                                "rce-mbox-left-notch",
                                                { 'message-focus': this.props.focus },
                                            )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M20 0v15L5 7" />
                                            </svg>
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
            // </Animated>
        );
    }
}

MessageBox.defaultProps = {
    position: 'left',
    type: 'text',
    text: '',
    title: null,
    titleColor: null,
    onTitleClick: null,
    onForwardClick: null,
    onReplyClick: null,
    onRemoveMessageClick: null,
    onReplyMessageClick: null,
    date: new Date(),
    data: {},
    onClick: null,
    onOpen: null,
    onDownload: null,
    onLoad: null,
    onPhotoError: null,
    forwarded: false,
    reply: false,
    status: null,
    dateString: null,
    notch: true,
    avatar: null,
    renderAddCmp: null,
    copiableDate: false,
    onContextMenu: null,
    focus: false,
    onMessageFocused: null,
};


export default MessageBox;
