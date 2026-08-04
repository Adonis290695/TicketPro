<template>

    <div class="flex items-center justify-center gap-6">
    
        <button
            @click="disminuir"
            class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-xl font-bold"
            >
                -
        </button>

        <span class="text-2xl font-bold">
            {{ modelValue }}
        </span>

        <button
            @click="aumentar"
            class="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold"
            >
               +
        </button>
              
    </div>


</template>

<script setup lang="ts">

const props = defineProps<{
    modelValue:number;
    max:number;
}>();

const emit = defineEmits<{
    (e:"update:modelValue", valor:number):void;
}>();

function aumentar(){
    if(props.modelValue<props.max){

        emit(
        "update:modelValue",
        props.modelValue + 1
      );

    }
}

function disminuir(){
    if(props.modelValue > 1 ){

        emit(
            "update:modelValue",
            props.modelValue - 1
        );

    }
}
</script>