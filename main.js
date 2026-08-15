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


function createBrick(proj, useBlogCover) {
    var col = document.createElement('div');
    col.className = 'brick';

    var img = document.createElement('img');
    img.className = 'project-cover';
    img.src = `../media/projects/${useBlogCover ? proj.blog_cover : proj.cover}`;
    img.alt = proj.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    col.appendChild(img);

    var descDiv = document.createElement('div');
    descDiv.className = 'project-description';

    var h2 = document.createElement('h2');
    h2.innerText = proj.title;
    descDiv.appendChild(h2);

    if (proj.date) {
        var dateSpan = document.createElement('span');
        dateSpan.className = 'project-date';
        dateSpan.innerText = proj.date;
        descDiv.appendChild(dateSpan);
    }

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
        descDiv.appendChild(p);

        if (proj.link) {
            var lp = document.createElement('p');
            var llink = document.createElement('a');
            llink.innerText = proj.ext_link_text;
            llink.className = 'project-link';
            llink.href = proj.link;
            lp.appendChild(llink);
            descDiv.appendChild(lp);
        }
    }

    var tags = document.createElement('div');
    tags.className = 'tags';
    proj.tags.forEach(tag => {
        var span = document.createElement('span');
        span.className = 'tag';

        if (useBlogCover) {
            // blog page: tags are filter pills
            span.className = 'tag filter-inline';
            span.innerText = tag;
            span.classList.toggle('active', activeBlogFilters.has(tag));
            span.addEventListener('click', function () {
                toggleBlogFilter(tag);
            });
        } else {
            // portfolio pages: tags are navigation links
            var link = document.createElement('a');
            link.href = (tag === 'bw' || tag === 'colors') ? '/' + tag : '/blog';
            link.innerText = tag;
            span.appendChild(link);
        }

        tags.appendChild(span);
    });

    descDiv.appendChild(tags);
    col.appendChild(descDiv);
    return col;
}


var activeBlogFilters = new Set();

var BLOG_TAGS = ['news', 'blog', 'digital', 'gallery', 'sketchbook'];

function toggleBlogFilter(tag) {
    if (activeBlogFilters.has(tag)) {
        activeBlogFilters.delete(tag);
    } else {
        activeBlogFilters.add(tag);
    }
    // sync active state on all matching pills (top menu + inline card tags)
    var pills = document.querySelectorAll('.filter-pill, .filter-inline');
    pills.forEach(function (p) {
        if (p.innerText === tag) {
            p.classList.toggle('active', activeBlogFilters.has(tag));
        }
    });
    displayProjects();
}

function getBlogTags() {
    var tags = new Set();
    projData.projects.forEach(function (proj) {
        if (BLOG_TAGS.some(function (t) { return proj.tags.includes(t); })) {
            proj.tags.forEach(function (t) {
                if (t !== 'bw' && t !== 'colors') tags.add(t);
            });
        }
    });
    return Array.from(tags);
}

function displayProjects() {
    var grid = document.getElementById('masonry-index') || document.getElementById('masonry-colors') || document.getElementById('masonry-bw') || document.getElementById('masonry-blog');
    var selectedTag = getSelectedTagForGrid(grid);
    var filteredProjects = projData.projects;
    if (selectedTag) {
        var tags = Array.isArray(selectedTag) ? selectedTag : [selectedTag];
        filteredProjects = filteredProjects.filter(proj => tags.some(tag => proj.tags.includes(tag)));
    }
    if (grid.id === 'masonry-blog' && activeBlogFilters.size > 0) {
        filteredProjects = filteredProjects.filter(proj =>
            proj.tags.some(function (t) { return activeBlogFilters.has(t); })
        );
    }
    if (grid.id === 'masonry-index') {
        filteredProjects = filteredProjects.filter(proj => proj.show_on_main);
    }

    grid.innerHTML = '';
    var useBlogCover = grid.id === 'masonry-blog';
    filteredProjects.forEach(proj => {
        var brick = createBrick(proj, useBlogCover);
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
    } else if (grid.id === 'masonry-blog') {
        return BLOG_TAGS;
    }
    return null;
}

function initSlider(container) {
    var slides = container.querySelectorAll('.slide');
    var prev = container.parentNode.querySelector('.slider-prev');
    var next = container.parentNode.querySelector('.slider-next');
    var i = 0;

    function show(n) {
        slides[i].classList.remove('active');
        i = (n + slides.length) % slides.length;
        slides[i].classList.add('active');
    }

    if (next) next.onclick = function () { show(i + 1); };
    if (prev) prev.onclick = function () { show(i - 1); };
}

function openPrivacy() {
    var popup = document.getElementById('privacy-popup');
    if (popup) popup.classList.add('show');
}

function closePrivacy(event) {
    if (event) event.stopPropagation();
    var popup = document.getElementById('privacy-popup');
    if (popup) popup.classList.remove('show');
}

function buildBlogFilters() {
    var container = document.getElementById('blog-filters');
    if (!container) return;
    getBlogTags().forEach(function (filter) {
        var pill = document.createElement('a');
        pill.className = 'filter-pill';
        pill.innerText = filter;
        pill.href = '#';
        pill.addEventListener('click', function (e) {
            e.preventDefault();
            toggleBlogFilter(filter);
        });
        container.appendChild(pill);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.slider').forEach(initSlider);

    buildBlogFilters();

    if (document.getElementById('masonry-index')) {
        displayProjects();
    } else if (document.getElementById('masonry-colors')) {
        displayProjects();
    } else if (document.getElementById('masonry-bw')) {
        displayProjects();
    } else if (document.getElementById('masonry-blog')) {
        displayProjects();
    }

    var vntn = document.getElementById('aboutme-vntn');
    if (vntn) {
        var wrap = vntn.parentNode;
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY || 0;
            var maxTravel = Math.max(0, wrap.clientHeight - vntn.clientHeight);
            var offset = Math.min(scrollY * 0.15, maxTravel);
            vntn.style.transform = 'translateY(' + offset + 'px)';
        });

        wrap.addEventListener('mouseenter', function () {
            vntn.style.transition = 'transform 0.3s ease';
            var dx = (Math.random() * 2 - 1) * 16;
            var dy = (Math.random() * 2 - 1) * 16;
            vntn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        });
        wrap.addEventListener('mouseleave', function () {
            vntn.style.transform = 'translate(0, 0)';
        });
    }
});
