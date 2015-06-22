window.onload = function () {

    var sendButton = document.querySelector('.send'),
        messageInputElem = document.querySelector('.input-option.text'),
        messageListContainer = document.querySelector('.message-list-container'),
        messageListElem = messageListContainer.querySelector('.message-list'),
        messageEffectContainer = document.querySelector('.message-effect-container'),
        messageInfoContainer = document.querySelector('.message-info-container'),
        messageInputSection = document.querySelector('.section__message-input'),


        bleeding = 100,
        isContactTyping = false,


        numSentMessages = 0,
        numReceivedMessages = 0,
        lastMessage,

        KEYCODE_ENTER = 13,

        lipsums = [
            'legentis assum exerci enim mazim habent dynamicus lobortis',
            'futurum quis duis duis quam nihil qui humanitatis',
            'mutationem dignissim feugait diam liber seacula ex zzril',
            'ex ullamcorper et decima sed diam parum odio',
            'lius est typi legunt diam legentis qui per',
            'qui exerci nunc eorum nulla magna molestie soluta',
            'facit qui sed habent nulla mutationem aliquip mirum',
            'videntur et at duis duis nihil euismod suscipit',
            'dolor lorem nibh claritatem et seacula decima aliquip',
            'typi etiam litterarum quam in veniam processus littera'
        ],

        PATH__GOO_FILTER = 'url("/svg/filters/gooey-effects.svg#goo")',

        BASE_ANIMATION_DURATION = 1.0,
        DURATION__RENDER_MESSAGE = BASE_ANIMATION_DURATION * 0.7,

    // Perform initial query for property values that we'll change, but then
    // want to animate back to their current state. Doing this once prevents costly
    // read-write loops during the animation
        preComps = {
            messageInputSectionHeight: messageInputSection.offsetTop
        };


    function addGoo() {
        setFilter(PATH__GOO_FILTER, messageEffectContainer);
    }

    function removeGoo() {
        setFilter('none', messageEffectContainer);
    }


    sendButton.addEventListener('click', function () {
        if (messageInputElem.textContent) {
            sendMessage(messageInputElem.textContent);
        }
    });

    messageInputElem.addEventListener('keydown', function (e) {
        if (e.keyCode === KEYCODE_ENTER && messageInputElem.textContent) {
            sendMessage(messageInputElem.textContent);
        }
    });


    function createMessageItem(message, isSending) {

        var messageItem = document.createElement('li'),
            messageBubble = document.createElement('div');

        messageItem.className = isSending ?
            'message-item_sent' : 'message-item_received';

        messageBubble.className = 'chat-message-bubble';
        messageBubble.textContent = message;

        messageItem.appendChild(messageBubble);

        return messageItem;
    }


    function renderMessage(message, isSending) {

        var renderTL = new TimelineMax(),
            oldScroll = messageListContainer.scrollTop;   // compute current scroll top of the list container element

        messageListContainer.scrollTop = 999999;          // ensure that the list container is scrolled all the way down
        var newScroll = messageListContainer.scrollTop,   // now grab distance that was scrolled so we can animate it
            scrollDiff = newScroll - oldScroll,

            scrollTween = function scrollTween() {
                return TweenMax.fromTo(
                    messageListElem,
                    DURATION__RENDER_MESSAGE,
                    {
                        y: scrollDiff
                    },
                    {
                        y: 0,
                        ease: Power4.easeOut
                    }
                );
            };

        var messageItem = createMessageItem(message, isSending),
            messageItemCopy = createMessageItem(message, isSending);  // animate this from the input box to the position on the list

        messageItem.style.opacity = 0;  // animate to visible after gooey effect
        messageItemCopy.style.opacity = 0;
        messageListElem.appendChild(messageItem);
        messageEffectContainer.appendChild(messageItemCopy);

        var listContainerRect = messageListContainer.getBoundingClientRect(),
            listElemRect = messageItem.getBoundingClientRect(),
            listElemCopyRect = messageItemCopy.getBoundingClientRect(),
            yDist = listElemCopyRect.top - listElemRect.top;

        var switchOutCopy = function switchOutCopy() {
                return TweenMax.set(
                    messageItemCopy,
                    {
                        opacity: 0,
                        onComplete: function () {
                            TweenMax.set(messageItem, {opacity: 1 });
                        }
                    }
                );
            },

            bubbleUp = function bubbleUp() {
                return TweenMax.to(
                    messageItemCopy,
                    DURATION__RENDER_MESSAGE,
                    {
                        opacity: 1,
                        transform: 'translate3d(0px, -' + yDist + 'px, 0)',
                        onComplete: switchOutCopy
                    }
                );
            };

        renderTL.add([scrollTween(), bubbleUp()]);
        return renderTL;
    }

    /**
     * Delete text content and shrink the text box
     */
    function adjustInputSection(currentInputHeight) {

        debugger;
        var tl = new TimelineMax(),
            heightDiff = currentInputHeight - preComps.messageInputSectionHeight,

            shrinkBox = function shrinkBox() {
                return TweenMax.to(
                    messageInputElem,
                    BASE_ANIMATION_DURATION * 0.3,
                    {
                        height: heightDiff
                    }
                );
            };

        messageInputElem.textContent = '';
        tl.add(shrinkBox());
        return tl;
    }


    function sendMessage(message) {

        var masterSendTL = new TimelineMax(),
            currentInputHeight = messageInputElem.offsetHeight;

        lastMessage = message;

        masterSendTL.add(renderMessage(message, true));
        //masterSendTL.add(addGoo(), 0);
        masterSendTL.add(adjustInputSection(currentInputHeight), 0);
    }

    // TODO: Recieve Message
};
