<script>
  export let data;
</script>


    <h1>{data.records.title}</h1>
    <h1>{data.records.tag}</h1>
    <h1>{data.records.company_name}</h1>
    <img src='http://127.0.0.1:8090/api/files/jobs/{data.records.id}/{data.records.picture}' alt='{data.records.company_name} Logo'>
    <div>{@html data.records.description}</div>
    <!-- Render other job details here -->
  


<style>
  /* Add your styles here */
</style>
