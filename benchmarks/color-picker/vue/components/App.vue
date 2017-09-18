<template>
    <div class="colors">
        <h1>Choose your favorite color:</h1>
        <div class="colors">
            <ul v-if="colors.length">
                <li v-for="(color, i) in colors"
                    :class="['color', selectedColorIndex === i ? 'selected' : null]"
                    @click="handleColorClick(i)">
                    {{ color.name }}
                </li>
            </ul>
            <div v-else>
                No colors!
            </div>
        </div>
        <div>
            You chose:
            <div class="chosen-color">{{ colors[selectedColorIndex].name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['colors', 'handleMount', 'handleUpdate'],
    mounted() {
        if (this.handleMount) {
            this.handleMount(this);
        }
        window.onMount();
    },
    updated() {
        if (this.handleUpdate) {
            this.handleUpdate(this);
        }
    },
    data: function() {
        return {
            selectedColorIndex: 0
        }
    },
    methods: {
        handleColorClick: function(colorIndex) {
            this.selectedColorIndex = colorIndex;
        }
    }
};
</script>
