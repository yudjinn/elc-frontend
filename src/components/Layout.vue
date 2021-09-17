<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">NW-Bank</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nwNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nwNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#/user/search">Users<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/bank/search">Banks</a>
          </li>
        </ul>

      </div>
    </nav>

    <router-view  class="flex-fill mt-2"></router-view>
  </div>
</template>

<script>

  export default {

  }

</script>
<style scoped>

</style>
