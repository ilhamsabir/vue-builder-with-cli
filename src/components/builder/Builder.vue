<template>
  <div class="builder">
    <app-navbar></app-navbar>
    <div class="container-fluid builder-container">
      <div class="sidebar">
        <app-sidebar v-if="sidebarActive === 'main-sidebar'" :props-element="elements"></app-sidebar>
        <app-editbar v-if="sidebarActive === 'edit-sidebar'" ></app-editbar>
      </div>
      <div class="wrapper">
        <app-workspace :props-element="elements"></app-workspace>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Navbar from './Navbar'
  import Sidebar from './Sidebar'
  import Editbar from './Editbar'
  import Workspace from '././workspace/Workspace'

  export default {
    name: 'Builder',
    components: {
      'app-navbar': Navbar,
      'app-sidebar': Sidebar,
      'app-workspace': Workspace,
      'app-editbar': Editbar
    },
    data () {
      return {
        params: this.$route.params.id,
        elements: [],
        errors: [],
        sidebarActive: 'main-sidebar'
      }
    },
    created() {
      this.fetchElementData()

    },
    mounted() {
      this.handleClickActionElement()      
    },
    updated() {
        this.$nextTick(function () {
          // this.handleClickActionElement()
        })
        // this.handleClickActionElement()
    },
    methods: {
      // fetch element data
      fetchElementData() {
        const url = './elements.json'
        axios.get(url)
        .then(response => {
          this.elements = response.data
        })
        .catch(e => {
         this.errors.push(e)
        })
      },

      // handle click action element
      handleClickActionElement() {
        $('body').on('click', '.box-action-element__item', function() {
          const dataAction = $(this).attr('data-action')
          const dataId = $(this).attr('data-id')

          switch (dataAction) {
            case "edit":
              const editSidebar = "edit-sidebar"
              this.sidebarActive = editSidebar
              console.log(this.sidebarActive)
              break;
            default:

          }

          $('.editable[data-id="'+dataId+'"]').focus()
        })
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .builder-container {
    display: flex;
    padding-left: 0;
    padding-right: 0;
  }
  .sidebar {

  }
  .wrapper {
    flex: 1;
    width: 100%;
    margin-left: 360px;
  }
</style>
