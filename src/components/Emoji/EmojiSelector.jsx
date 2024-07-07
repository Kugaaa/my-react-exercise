import EmojiPicker from "emoji-picker-react";
import {useEffect} from "react";

const EmojiSelector = ({updateEmoji, closeEmojiSelectMode}) => {

    useEffect(() => {
        const closeModalIfEscaped = (e) => {
            e.key === "Escape" && closeEmojiSelectMode();
        }

        window.addEventListener('keydown', closeModalIfEscaped)

        return () => {
            window.removeEventListener('keydown', closeModalIfEscaped)
        }
    }, [closeEmojiSelectMode])

    const onEmojiClick = (emoji, _) => {
        updateEmoji(emoji.emoji);
    }

    return (
        <div
            role="dialog"
            className="todo"
            onClick={(e) => {
                e.target === e.currentTarget && closeEmojiSelectMode()
            }}
        >
            <EmojiPicker
                lazyLoadEmojis={true}
                skinTonesDisabled={true}
                onEmojiClick={onEmojiClick}
            />
        </div>
    )
}

export default EmojiSelector;