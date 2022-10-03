// components/tabs/tabs.js

Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  data: {

  },

  methods: {
    handItemTap(e) {
      const {index} = e.currentTarget.dataset;
      this.triggerEvent("tabsItemChange", {
        index
      });
    }
  }
})
