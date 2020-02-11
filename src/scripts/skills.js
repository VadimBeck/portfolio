import Vue from "vue";
import axios from "axios";

const skill = {
  template: "#skill",
  props: ["skillName", "skillPercent"],
  methods: {
    drowColoredCircle() {
      const circle = this.$refs["color-circle"];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );

      const percent = (dashArray / 100) * (100 - this.skillPercent);

      circle.style.strokeDashoffset = percent;
    }
  },
  mounted() {
    this.drowColoredCircle();
  }
};

const skillsRow = {
  template: "#skills-row",
  components: {
    skill
  },
  props: ["category"]
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  data() {
    return {
      categories: []
    };
  },
  components: {
    skillsRow
  },
  methods: {
    fetchSkills() {
      axios
        .get("https://webdev-api.loftschool.com/categories/253")
        .then(response => {
          this.categories = response.data;
        });
    }
  },
  created() {
    this.fetchSkills();
  }
});
