<template>
  <div class="styleEditor" ref="container">
    <div class="code" v-html="codeInStyleTag"></div>
    <pre class="" v-html="highlightedCode"></pre>
  </div>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'StyleEditor',
    props: ['code'],
    computed: {
      highlightedCode() {
        return Prism.highlight(this.code, Prism.languages.css);
      },
      codeInStyleTag() {
        return `<style>${this.code}</style>`;
      }
    },
    methods: {
      goBottom() {
        this.$refs.container.scrollTop = 100000;
      }
    }
  };
</script>

<style scoped>
  .code {
    display: none;
  }

  pre {
    font-size: 12px;
  }
</style>
