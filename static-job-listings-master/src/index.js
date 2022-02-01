const jobsList= document.querySelector('.jobList')
let jobs= []

let filtersTag = []
let allTags= []

function getData() {
    fetch('../data.json')
        .then(res => res.json())
        .then(data => {
            jobs= data
        })
        .catch(error => {
            console.log(error);
        })
}

getData()
setTimeout(() => {
    console.log(jobs);
}, 1000 );

function printJobs(arrayJobs) {
    arrayJobs.forEach((job, i) => {
        let isNew= job.new ? `<span class="tagInfo new">New!</span>` : ''
        let isFeatured= job.featured ? `<span class="tagInfo featured">Featured</span>` : ''
        let jobTags= []
        let tags= []

        jobTags.push(job.role, job.level, ...job.languages, ...job.tools)

        jobTags.forEach((tag) => {
            tags += `<button class="btnTagJob">${tag}</button>`
        });


        jobsList.innerHTML += `<li>
                                    <div class="jobInfo">
                                        <img src="${job.logo}" alt="">
                                        <section>
                                            <div class="rowJobInfo">
                                                <span>${job.company}</span>
                                                ${isNew}
                                                ${isFeatured}
                                            </div>

                                            <div class="rowJobInfo">
                                                <span>${job.position}</span>
                                            </div>

                                            <div class="rowJobInfo">
                                                <span>${job.postedAt}</span>
                                                <span>${job.location}</span>
                                                <span>${job.contract}</span>
                                            </div>
                                        </section>
                                    </div>
                                    <div class="jobTags">
                                        ${tags}
                                    </div>
                                </li>`;
        allTags.push(...jobTags)
    });
    
    allTags= removeDuplicates(allTags)
    console.log(allTags); 
}

setTimeout(() => {
    printJobs(jobs)
}, 1000);

function removeDuplicates(array) {
    const dataArr = new Set(array);
    let result = [...dataArr];

    return result
}
