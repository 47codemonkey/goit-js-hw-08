import gallery_items from "../src/gallery-items.js";

class Gallery {
    constructor(options) {
        this.images = options.images;
        this.elements = document.querySelector(options.element);
        this.lightbox = document.querySelector(options.lightbox);

        this.init();
    }

    init() {
        this.render();
        this.events();
    }

    events() {
        this.elements.onclick = event => {
            event.preventDefault();
            let target = event.target;
            if (target.tagName !== "IMG") return;

            this.lightbox
                .querySelector(".lightbox___image")
                .setAttribute("src", target.dataset.source);
            this.lightbox.classList.toggle("is-open");
        };

        this.lightbox.onclick = event => {
            event.preventDefault();
            let target = event.target;

            if (target.className === "lightbox__content") {
                this.lightbox.classList.remove("is-open");
                this.lightbox
                    .querySelector(".lightbox___image")
                    .setAttribute("src", "");
            }
        };

        this.lightbox.querySelector(
            'button[data-action="close-lightbox"]'
        ).onclick = event => {
            event.preventDefault();
            this.lightbox.classList.remove("is-open");
            this.lightbox
                .querySelector(".lightbox___image")
                .setAttribute("src", "");
        };

        document.onkeydown = evt => {
            evt = evt || window.event;
            if (evt.keyCode === 27) {
                this.lightbox.classList.remove("is-open");
                this.lightbox
                    .querySelector(".lightbox___image")
                    .setAttribute("src", "");
            }
        };
    }

    template(image) {
        const {
            preview,
            original,
            description
        } = image;

        return `
          <li class="gallery__item">
            <a
              class="gallery__link"
              href="${original}"
            >
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
  
              <span class="gallery__icon">
                <i class="material-icons">zoom_out_map</i>
              </span>
            </a>
          </li>
      `;
    }
    render() {
        this.elements.innerHTML = this.images.map(this.template).join("");
    }
}

new Gallery({
    element: ".gallery",
    lightbox: ".lightbox",
    images: gallery_items
});



///or

// import galleryItems from './gallery-items.js';

// const galleryElement = document.querySelector('.js-gallery');

// function createGalleryItem({preview, description, original}) {
//   const item = document.createElement('li');
//   const galleryLink = document.createElement('a');
//   const image = document.createElement('img');
//   const galleryIcon = document.createElement('span');
//   const materialIcon = document.createElement('i');
//   materialIcon.classList.add('material-icons');
//   galleryIcon.classList.add('gallery__icon');
//   item.classList.add('gallery__item');
//   galleryLink.classList.add('gallery__link');
//   image.classList.add('gallery__image');
//   image.src = preview;
//   image.alt = description;
//   image.setAttribute('data-source', original);
// //   galleryLink.setAttribute('href', original); если оставить ссылку активной, то происходит переход вместо открытия lightbox
//   galleryIcon.appendChild(materialIcon);
//   galleryLink.append(image, galleryIcon);
//   item.appendChild(galleryLink);
//   return item;
// };

//   const elements = galleryItems.map((e) => createGalleryItem(e));
//   galleryElement.append(...elements);

//   galleryElement.addEventListener('click', handleClick);

//   const lightbox = document.querySelector('.js-lightbox');
//   const lightboxImage = document.querySelector('.lightbox__image');

//   function handleClick(e) {
//       if(e.target === e.currentTarget) {
//         return;
//       };
//       lightbox.classList.add('is-open');
//       const newSrc = e.target.dataset.source;
//       lightboxImage.src = newSrc;
//   };

//   const lightboxButton = document.querySelector('.lightbox__button');

//   lightboxButton.addEventListener('click', handleCloseButton);

//   function handleCloseButton(e) {
//       lightbox.classList.remove('is-open');
//       lightboxImage.src = "";
//   };


//   lightbox.addEventListener('click', handleClose);

//   const lightboxContent = document.querySelector('.lightbox__content');

//   function handleClose(e) {
//       if(e.target === lightboxContent) {
//         lightbox.classList.remove('is-open');
//         lightboxImage.src = "";
//       };
//   };

//   document.addEventListener('keydown', handleCloseByEcs);

//   function handleCloseByEcs(e) {
//     const key = e.keyCode;

//     if(key === 27) {
//       lightbox.classList.remove('is-open');
//       lightboxImage.src = "";
//     };
//   };

