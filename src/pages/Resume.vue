<template>
  <div id="resume">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
  </div>
</template>

<script>
  import StyleEditor from '@/components/StyleEditor';
  import ResumeEditor from '@/components/ResumeEditor';
  import '@/assets/reset.css';

  export default {
    name: 'Resume',
    components: {
      StyleEditor,
      ResumeEditor
    },
    data: () => ({
      interval: 30, // speed
      currentStyle: '',
      enableHtml: false,
      fullStyle: [],
      currentMarkdown: '',
      fullMarkdown: ''
    }),
    created() {
      this.writeResume();
    },
    methods: {
      async writeResume() {
        await this.initResume();
        await this.progressivelyShowStyle(0);
        await this.progressivelyShowResume();
        await this.progressivelyShowStyle(1);
        await this.showHtml();
        await this.progressivelyShowStyle(2);
        await this.resumeGoTop();
        await this.progressivelyShowStyle(3);
      },
      showHtml() {
        return new Promise((resolve, reject) => { // eslint-disable-line
          this.enableHtml = true;
          resolve();
        });
      },
      initResume() {
        return new Promise((resolve, reject) => { // eslint-disable-line
          let lang = this.$route.params.lang;
          lang = ['zh', 'en'].includes(lang) ? lang : 'en';
          this.fullStyle = [0, 1, 2, 3].map((i) => require(`@/resources/${lang}/styles${i}.css.data`)); // eslint-disable-line
          this.fullMarkdown = require(`@/resources/${lang}/resume.data`); // eslint-disable-line
          resolve();
        });
      },
      progressivelyShowStyle(n) {
        return new Promise((resolve, reject) => { // eslint-disable-line
          const interval = this.interval;
          const showStyle = (async function () { // eslint-disable-line
            const style = this.fullStyle[n];
            if (!style) {
              return;
            }
            // 计算前 n 个 style 的字符总数
            const length = this.fullStyle.filter((_, index) => index <= n).map(item => item.length).reduce((p, c) => p + c, 0);
            const prefixLength = length - style.length;

            if (this.currentStyle.length < length) {
              const l = this.currentStyle.length - prefixLength;
              const char = style.substring(l, l + 1) || ' ';
              this.currentStyle += char;
              if ('\n' === style.substring(l - 1, l) && this.$refs.styleEditor) {
                this.$nextTick(() => {
                  this.$refs.styleEditor.goBottom(); // 如果用Vuex引入全局state，这里可以trigger action
                });
              }
              setTimeout(showStyle, interval);
            } else {
              resolve();
            }
          }).bind(this);

          showStyle();
        });
      },
      progressivelyShowResume() {
        return new Promise((resolve, reject) => { // eslint-disable-line
          const length = this.fullMarkdown.length;
          const interval = this.interval;
          const showResume = () => {
            if (this.currentMarkdown.length < length) {
              this.currentMarkdown = this.fullMarkdown.substring(0, this.currentMarkdown.length + 1);
              const lastChar = this.currentMarkdown[this.currentMarkdown.length - 1]; // eslint-disable-line
              const prevChar = this.currentMarkdown[this.currentMarkdown.length - 2];
              // console.log(prevChar)
              if ('\n' === prevChar && this.$refs.resumeEditor) {
                this.$nextTick(() => this.$refs.resumeEditor.goBottom());
              }
              setTimeout(showResume, interval);
            } else {
              resolve();
            }
          };
          showResume();
        });
      },
      resumeGoTop() {
        return new Promise((resolve, reject) => { // eslint-disable-line
          if (this.$refs.resumeEditor) {
            this.$refs.resumeEditor.goTop();
            resolve();
          }
        });
      }
    }
  };
</script>

<style scoped>
  #resume {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
