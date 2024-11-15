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

var selectedTag = '';


document.addEventListener('DOMContentLoaded', function () {
if (document.getElementById('masonry')) {

    document.getElementById('top-menu').addEventListener('click', event => {
        if (event.target.tagName === 'A' && event.target.hasAttribute('data-tag')) {
            event.preventDefault();
            selectedTag = event.target.getAttribute('data-tag');
            filterAndDisplayProjects();
        }
    });

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

        if (proj.type === 'artwork') {
            var desc = document.createElement('p');
            desc.innerText = proj.description;
            descDiv.appendChild(desc);

            if (proj.ext_link) {
                var p = document.createElement('p');
                var link = document.createElement('a');
                link.target = '_blank';
                link.innerText = proj.ext_link_text;
                link.className = 'project-link';
                link.href = proj.ext_link;
                p.appendChild(link);
                descDiv.appendChild(p);
            }
        }

        if (proj.type === 'page') {
            var p = document.createElement('p');
            var link = document.createElement('a');
            link.innerText = 'open...';
            link.className = 'project-link';
            link.href = proj.link;
            p.appendChild(link);
            descDiv.appendChild(p);
        }

        var tags = document.createElement('div');
        tags.className = 'tags';
        proj.tags.forEach(tag => {
            var span = document.createElement('span');
            span.className = 'tag';
            span.innerText = tag;
            tags.appendChild(span);
            span.addEventListener('click', event => {
                selectedTag = tag;
                filterAndDisplayProjects();
            });
        });
        descDiv.appendChild(tags);
        col.appendChild(descDiv);
        return col;
    }

    function filterAndDisplayProjects() {
            var grid = document.getElementById('masonry');
            var filteredProjects = selectedTag ? projData.projects.filter(proj => proj.tags.includes(selectedTag)) : projData.projects;
            grid.innerHTML = '';
            filteredProjects.forEach(proj => {
                var brick = createBrick(proj);
                grid.appendChild(brick);
            });

    }

    filterAndDisplayProjects();
};
});