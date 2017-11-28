<template>
  <div class="">
    <app-header></app-header>
    <div class="dashboard">
      <h1>{{ title }}</h1>
    </div>
    <paginate name="collection-pagination" :list="collections" :per="5" :class="'card-strip-container'">
      <li v-for="collections in paginated('collection-pagination')" class="card-strip">
        {{ collections.name }}
        <router-link :to="{ name: 'Builder', params: { id: collections.id }}">User</router-link>
      </li>
    </paginate>
    <paginate-links for="collection-pagination" :classes="{'ul': 'pagination'}"></paginate-links>
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './../Header'

  export default {
    name: 'Dashboard',
    components: {
      'app-header': Header
    },
    data () {
      return {
        title: 'Dashboard oke',
        paginate: ['collection-pagination'],
        collections: [],
        posts: [],
        errors: [],
      }
    },
    created() {
      const url = './collection.json'
      axios.get(url)
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data
        this.collections = response.data
        console.log(this.posts)
      })
      .catch(e => {
       this.errors.push(e)
      })

       // async / await version (created() becomes async created())
       //
       // try {
       //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
       //   this.posts = response.data
       // } catch (e) {
       //   this.errors.push(e)
       // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .card-strip-container {
      margin-bottom: 4.875rem;
      transition: all 0.3s ease;
      margin-top: 1.5rem;
      background: #fff;
  }

  .card-strip-container>.card-strip:first-child {
    border-top: 1px solid rgba(177,186,204,0.4);
    border-radius: 3px 3px 0 0;
  }

  .card-strip-container>.card-strip {
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    border: 1px solid rgba(177,186,204,0.4);
    min-width: 100%;
    padding: 1.4375rem 1.625rem 1.3125rem 1.625rem;
    transition: all 0.3s ease-in-out;
    font-size: 1rem;
    line-height: 1.2rem;
    border-top: 1px solid transparent;
    margin-bottom: -0.0625rem;
  }

  .card-strip-container>.card-strip:hover:first-child {
    border-top: 1px solid rgba(177,186,204,0.4);
  }

  .card-strip:hover, .card-strip.is-active {
    background: #fff;
    margin: 0px -0.4375rem -0.0625rem -0.4375rem;
    padding-left: 2.0625rem;
    padding-right: 2.0625rem;
    z-index: 5;
    position: relative;
    border-radius: 3px !important;
    border: 1px solid rgba(177,186,204,0.4);
    transition: all 0.3s ease-in-out;
  }

  .card-strip:hover:after, .card-strip.is-active:after {
    opacity: 1;
  }

  .card-strip:after {
    content: '';
    position: absolute;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.26);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease-in-out;
  }

  .pagination>li {
      display: inline;
      cursor: pointer;
  }
</style>
