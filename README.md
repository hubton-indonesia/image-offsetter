### Development

- `deno task build`

### Deployment

Use Gitflow.

- `deno task bundle`
- `deno publish`

### Usage Example

```html
<div class="container mx-auto">
 <div class="w-full js-container-anchor"></div>
 <div class="w-10/12 ml-auto">
   <div class="w-full js-image-anchor"></div>
   <img src="https://placehold.co/300" class="w-full h-auto js-image"/>
 </div>
</div>
```

```js
new ImageOffsetter({
  containerAnchor: document.querySelector('.js-container-anchor'),
  imageAnchor: document.querySelector('.js-image-anchor'),
  image: document.querySelector('.js-image'),

  // pull: 'left',
  // on: {
  //   offsetChange: (offset) => console.log(offset)
  // },
  // maxWindowWidth: window.innerWidth
})
```
