(function(window, undefined){
    'use strict';
    var imageviewerEl = document.getElementById('imageviewer'),
        basePath = imageviewerEl.getAttribute('data-base-path') || 'images/',
        images = imageviewerEl.getAttribute('data-images').split(','),
        outerBgColor = imageviewerEl.getAttribute('data-outer-bg-color'),
        innerBgColor = imageviewerEl.getAttribute('data-inner-bg-color'),
        delay = imageviewerEl.getAttribute('data-delay') || 500,
        outerContainerEl = document.createElement('div'),
        innerContainerEl = document.createElement('div'),
        imageEl = document.createElement('img'),
        width = imageviewerEl.getAttribute('data-width'),
        height = imageviewerEl.getAttribute('data-height'),
        index;

    function addStylesToEl(el, elStyles){
        var st = el.style;
        elStyles.forEach(function(style){
            st[style[0]] = style[1];
        });
    }

    function fadeIn(el){
        var opacity = 0,
            tid;
        imageEl.setAttribute('src', images[index]);
        tid = setInterval(function(){
            opacity += 0.01;
            addStylesToEl(el, [['opacity', opacity]]);
            if(opacity >= 1){
                clearInterval(tid);
                pause(el);
            }
        }, 10);
    }

    function pause(el){
       setTimeout(function(){
          fadeOut(el);
       }, delay);
    }

    function fadeOut(el){
        var opacity = 1,
            tid;
        tid = setInterval(function(){
            opacity -= 0.01;
            addStylesToEl(el, [['opacity', opacity]]);
            if(opacity <= 0){
                clearInterval(tid);
                index += 1;
                index = index > images.length - 1 ? 0 : index;
                fadeIn(el);
            }
        }, 10);
    }

    //Set style attributes
    outerContainerEl.setAttribute('class', 'imageviewer-outer-container');
    innerContainerEl.setAttribute('class', 'imageviewer-inner-container');
    imageEl.setAttribute('class', 'imageviewer-img');
    innerContainerEl.appendChild(imageEl);
    outerContainerEl.appendChild(innerContainerEl);
    // innerContainerEl.textContent = 'abc';

    //Override style attributes
    if(outerBgColor){
        addStylesToEl(outerContainerEl, [['background-color', outerBgColor]]);
    }
    if(innerBgColor){
        addStylesToEl(innerContainerEl, [['background-color', innerBgColor]]);
    }
    if(width){
        addStylesToEl(innerContainerEl, [['width', width]]);
    }
    if(height){
        addStylesToEl(innerContainerEl, [['height', height]]);
    }

    //Add outer container to the DOM
    imageviewerEl.appendChild(outerContainerEl);

    //Add basepath to each image
    images = images.map(function(i){
        var img = i.trim();
        return basePath + img;
    });

    //Show the 1st image
    index = 0;
    imageEl.setAttribute('src', images[index]);

    setTimeout(function(){
        pause(imageEl);
    }, 1);

}(window));
