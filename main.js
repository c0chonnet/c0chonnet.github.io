const logo = document.getElementById(brand);

function hover(logo) {
    logo.setAttribute('src', '../media/logo2.png');
}

function unhover(logo) {
    logo.setAttribute('src', '../media/logo1.png');
}

const ig = document.getElementById('ig');

function hoverIg(ig) {
    ig.setAttribute('src', '../media/ig2.png');
}

function unhoverIg(ig) {
    ig.setAttribute('src', '../media/ig1.png');
}

const be = document.getElementById('be');

function hoverBe(be) {
    be.setAttribute('src', '../media/be2.png');
}

function unhoverBe(be) {
    be.setAttribute('src', '../media/be1.png');
}

const g = document.getElementById(git);

function hoverG(g) {
    g.setAttribute('src', '../media/git2.png');
}

function unhoverG(g) {
    g.setAttribute('src', '../media/git1.png');
}

function createPopup(type, popup) { 
    var pu = document.createElement('div');

    if (type === "popup") {
        pu.className = 'popup';
        var row = document.createElement('div');
        row.className = 'row';

        var leftCol = document.createElement('div');
        leftCol.className = 'col';
        leftCol.innerHTML = popup.content;

        var rightCol = document.createElement('div');
        rightCol.className = 'col';

        var img = document.createElement('img');
        img.src = `../media/projects/${popup.cover}`;
        img.className = 'popup-cover';
        rightCol.appendChild(img);

        row.appendChild(leftCol);
        row.appendChild(rightCol);

        pu.appendChild(row);
    }

    if (type === "full") {
        pu.className = 'popup-full';
        var img = document.createElement('img');
        img.className = 'full';
        img.src = `../media/projects/${popup.cover}`;
        pu.appendChild(img);

        var aspectRatio = img.width / img.height;
        var isVertical = aspectRatio < 1; 
    
        var maxWidth = 0.7 * window.innerWidth;
        var maxHeight = 0.7 * window.innerHeight;
        
        var popupWidth, popupHeight;
        
        popupHeight = Math.min(maxHeight, img.height);
        popupWidth = popupHeight * aspectRatio;
        

        pu.style.width = popupWidth + 'px';
        pu.style.height = popupHeight + 'px';
                
};


    document.body.appendChild(pu);

    function handleOutsideClick(event) {

        setTimeout(function() {
            if (!pu.contains(event.target)) {
                pu.remove();  
                document.removeEventListener('click', handleOutsideClick); 
            }
        }, 400); 
    }


    setTimeout(function() {
        document.addEventListener('click', handleOutsideClick);
    }, 100);  


    pu.addEventListener('click', function(event) {
        event.stopImmediatePropagation(); 
    });

};

function createBrick(proj) {
    var col = document.createElement('div');
    col.className = 'brick';

    var img = document.createElement('img');
    img.className = 'project-cover';
    img.src = `../media/projects/${proj.cover}`;
    col.appendChild(img);

    var descDiv = document.createElement('div');
    descDiv.className = 'project-description';

    var h2 = document.createElement('h2');
    h2.innerText = proj.title;
    descDiv.appendChild(h2);

    if (proj.type === 'ext') {
        var desc = document.createElement('p');
        desc.innerText = proj.description;
        descDiv.appendChild(desc);

        if (proj.ext_link) {
            var p = document.createElement('p');
            var link = document.createElement('a');
            link.target = '_blank';
            link.innerText = '↗ ' + proj.ext_link_text;
            link.className = 'project-link';
            link.href = proj.ext_link;
            p.appendChild(link);
            descDiv.appendChild(p);
        }
    }

    if (proj.type === 'full') {
        var p = document.createElement('p');
        p.innerText = proj.description;
        var link = document.createElement('a');
        link.innerText = 'open...';
        link.href = "#";
        link.className = 'project-link';
        link.onclick = function(event) {
        event.preventDefault(); 
        createPopup('full', proj.popup); 
        };
        descDiv.appendChild(p);
        descDiv.appendChild(link);
    }

     if (proj.type === 'popup') {
        var p = document.createElement('p');
        p.innerText = proj.description;
        var link = document.createElement('a');
        link.innerText = 'open...';
        link.href = "#";
        link.className = 'project-link';
        link.onclick = function(event) {
        event.preventDefault(); 
        createPopup('popup', proj.popup); 
        };
        descDiv.appendChild(p);
        descDiv.appendChild(link);
    }

    var tags = document.createElement('div');
    tags.className = 'tags';
    proj.tags.forEach(tag => {
        var span = document.createElement('span');
        span.className = 'tag';

        var link = document.createElement('a');
        link.href = `/${tag}`;
        link.innerText = tag;

        span.appendChild(link);

        tags.appendChild(span);
    });

    descDiv.appendChild(tags);
    col.appendChild(descDiv);
    return col;
}


function displayProjects() {
    var grid = document.querySelector('main > div');
    var selectedTag = getSelectedTagForGrid(grid);
    var filteredProjects = selectedTag ? projData.projects.filter(proj => proj.tags.includes(selectedTag)) : projData.projects;

    grid.innerHTML = '';
    filteredProjects.forEach(proj => {
        var brick = createBrick(proj);
        grid.appendChild(brick);
    });
}

function getSelectedTagForGrid(grid) {
    if (grid.id === 'masonry-index') {
        return null;
    } else if (grid.id === 'masonry-colors') {
        return 'colors';
    } else if (grid.id === 'masonry-bw') {
        return 'bw';
    } else if (grid.id === 'masonry-digital') {
        return 'digital';
    } else if (grid.id === 'masonry-news') {
        return 'news';
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('masonry-index')) {
        displayProjects();
    } else if (document.getElementById('masonry-colors')) {
        displayProjects();
    } else if (document.getElementById('masonry-bw')) {
        displayProjects();
    } else if (document.getElementById('masonry-digital')) {
        displayProjects();
    } else if (document.getElementById('masonry-news')) {
        displayProjects();
    }
});
