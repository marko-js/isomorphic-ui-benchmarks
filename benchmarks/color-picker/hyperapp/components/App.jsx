const { h } = require('hyperapp');

const state = {
    selectedColorIndex: 0,
    colors: [],
};

const actions = {
    setColorIndex(selectedColorIndex) {
        return { selectedColorIndex };
    },
    onUpdate() {
        // for benchmark
    },
};

function renderColors(state, actions) {
    if (state.colors.length) {
        return (
            <ul>
                {state.colors.map((color, index) => (
                    <li
                        className={`color${state.selectedColorIndex === index ? ' selected' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        onclick={() => actions.setColorIndex(index)
                    }>
                        {color.name}
                    </li>
                ))}
            </ul>
        );
    } else {
        return <div>No colors!</div>
    }
}

function view(state, actions) {
    const currentColor = state.colors[state.selectedColorIndex];
    return (
        <div class="colors" onupdate={actions.onUpdate}>
            <h1>Choose your favorite color:</h1>
            <div class="colors">
                {renderColors(state, actions)}
            </div>
            <div>You chose: <div class="chosen-color">{currentColor.name}</div></div>
        </div>
    );
}

module.exports = {
    state,
    actions,
    view,
};
