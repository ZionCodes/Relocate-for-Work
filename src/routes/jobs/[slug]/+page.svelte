<script>
	export let data;
</script>

<div class="job-details" if:job> <h2>{job.title} - {job.companyname}</h2>
    <img src={job.picture} alt="{job.title}" class="job-image"> <p>{job.description}</p>
    <div class="job-info">
      <p><strong>Location:</strong> {job.city}, {job.country}</p>
      <p><strong>Tag:</strong> {job.tag}</p>
      </div>
  </div>