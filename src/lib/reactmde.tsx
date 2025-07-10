import { Command, MarkdownUtil, TextApi, TextState } from "react-mde";

// define the custom command handlers
function setHeader(
    initialState: TextState,
    api: TextApi,
    prefix: "#" | "##" | "###" | "####"
) {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = MarkdownUtil.selectWord({
        text: initialState.text,
        selection: initialState.selection,
    });

    const state1 = api.setSelectionRange(newSelectionRange);
    // Add the prefix to the selection
    const state2 = api.replaceSelection(`${prefix} ${state1.selectedText}`);
    // Adjust the selection to not contain the prefix
    api.setSelectionRange({
        start: state2.selection.end,
        end: state2.selection.end,
    });
}

export const headerOneCommand: Command = {
    icon: () => (
        <span role="img" aria-label="Add Header One">
            H1
        </span>
    ),
    execute: ({ initialState, textApi }) => {
        setHeader(initialState, textApi, "#");
    },
};

export const headerTwoCommand: Command = {
    icon: () => (
        <span role="img" aria-label="Add Header Two">
            H2
        </span>
    ),
    execute: ({ initialState, textApi }) => {
        setHeader(initialState, textApi, "##");
    },
};

export const headerThreeCommand: Command = {
    icon: () => (
        <span role="img" aria-label="Add Header Three">
            H3
        </span>
    ),
    execute: ({ initialState, textApi }) => {
        setHeader(initialState, textApi, "###");
    },
};

export const imageCommand: Command = {
    icon: () => (
        <span role="img" aria-label="Insert Image">
            🖼️
        </span>
    ),
    execute: ({ textApi }: { initialState: TextState; textApi: TextApi }) => {
        const markdownImage = `![alt text](url)`;
        textApi.replaceSelection(markdownImage);
        textApi.setSelectionRange({
            start: textApi.getState().selection.end - 1,
            end: textApi.getState().selection.end - 1,
        });
    },
};
