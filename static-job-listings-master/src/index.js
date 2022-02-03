const jobsList = document.querySelector('.jobList')
const filter = document.querySelector('.tagsColumn')
const btnClearTags = document.querySelector('#btnClearTags')

let jobs= []
let jobTags

let filtersTag = []
let allTags= []
let tagsByJob= []

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
}, 500 );

function printJobs(arrayJobs) {
    jobsList.innerHTML=``;
    
    arrayJobs.forEach((job, i) => {
        let isNew= job.new ? `<span class="tagInfo new">New!</span>` : ''
        let isFeatured= job.featured ? `<span class="tagInfo featured">Featured</span>` : ''
        let jobTags= []
        let tags= []

        jobTags.push(job.role, job.level, ...job.languages, ...job.tools)

        jobTags.forEach((tag) => {
            tags += `<div class="btnTagJob" data-value="${tag}">${tag}</div>`
        });
        tagsByJob.push([...jobTags])


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

    recordBTNtags();
    allTags= removeDuplicates(allTags)
}

setTimeout(() => {
    printJobs(jobs)
    console.log(tagsByJob);
    console.log(allTags); 
    /* filterListByTags() */
}, 500);


function removeDuplicates(array) {
    const dataArr = new Set(array);
    let result = [...dataArr];

    return result
}


function filterListByTags(arrTags=[]) {
    let indexesJob = []

    arrTags.forEach((tagF, i) => {
        tagsByJob.forEach((tags, j) => {
            tags.forEach((tag) => {
                if(tag == arrTags[i]){
                    indexesJob.push(j)
                }   
            })  
        })
    })

    indexesJob=ordenarArray(removeDuplicates(indexesJob))

    let filteredJobs = []
    for (let i = 0; i < indexesJob.length; i++) {
        for (let j = 0; j < jobs.length; j++) {
            if(indexesJob[i] == j){
                filteredJobs.push(jobs[indexesJob[i]]);
            }
        }
    }

    /* arrTags.length==0 ? filteredJobs= [...allTags] : filteredJobs= ['Vue'] */
    console.log(arrTags);
    console.log(filteredJobs);
    return filteredJobs
}

//orden de menor a mayor
function ordenarArray(array) {
    return array.sort((a,b)=>a-b)
}

function recordBTNtags() {
    const btnTags = document.querySelectorAll('div.jobTags div')
    const btnDeleteTag = document.querySelectorAll('div.btnTagJob span')
    console.log(btnDeleteTag);
    console.log(filter.childNodes);
    

    //X click
    btnDeleteTag.forEach(btn => {
        btn.addEventListener('click', () =>{
            setTimeout(() => {
                filter.removeChild(btn.parentElement);
            }, 500);
            
            setTimeout(() => {
                let filters = getFiltersNow()
                console.log(filters);
                printJobs(filterListByTags(filters))
            }, 500);
        })
    }); 
    
    //tag click
    btnTags.forEach(btn => {
        btn.addEventListener('click', () =>{
            if(findTagRepeated(btn.textContent)){
                return
            } else {
                filter.innerHTML += `<div class="btnTagJob" data-value="${btn.textContent}">${btn.textContent}<span>X</span></div>`;
                
                setTimeout(() => {
                    let filters = getFiltersNow()
                    printJobs(filterListByTags(filters))
                }, 500);
            }
        })
    }); 

}


function findTagRepeated(tag){
    let finded = false;
    filter.childNodes.forEach((tagFilter) => {
        if(tagFilter.dataset.value == tag){
            finded= true
        }
    })
    
    return finded
}

function getFiltersNow() {
    let tagsBTNS= filter.childNodes;
    let tagsNow= []
    
    console.log(tagsBTNS.length);
    if(tagsBTNS.length==0){
        return tagsNow= [...allTags]
    }

    tagsBTNS.forEach((tag, i) => {
        tagsNow.push(tag.dataset.value);
    });

    return tagsNow;
}


btnClearTags.addEventListener('click', () => {
    setTimeout(() => {
        filter.innerHTML= ``;
    }, 200);
    
    setTimeout(() => {
        let filters = getFiltersNow()
        console.log(filters);
        printJobs(filterListByTags(filters))
    }, 500);
})