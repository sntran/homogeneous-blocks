homogeneous-blocks
==================

Blocks that contains elements of the same kind.

The initial work is based of [Sir Trevor](http://madebymany.github.io/sir-trevor-js/) for fast prototyping.
But ideally, the blocks should be abstract enough to use in any block system (if any).

These blocks use a different namespace than Sir Trevor, so if you want to use them in your current set up, do:

```javascript
SirTrevor.Blocks.Columns = Homogeneous.Blocks.Columns;
```

befor declaring any SirTrevor instances.

## Styles Guide

* A UI button to add another element.
* A hover button to remove an element.
* Any other functionality should only appear on hover to avoid distraction.
* As little markup and styles as possible.

## Blocks

This is an ongoing project. Please only use the blocks that are completed.

- [x] Multi-column Block
- [x] Horizontal Tab Block
- [x] Vertical Tab Block
- [ ] Accordion Tab
- [ ] Marquee Block
 
<img src="https://trello-attachments.s3.amazonaws.com/523eefe395a8b2d77a001a95/52811158b74b56941a00703e/408ae5b8527c5ae30c8f844aaac0d233/Homogenous_Blocks.png" />

### Multi-column Block

This is a very simple block. It starts as a normal text/markdown block, but has a button to add another column. The width of each column is equal and contained within the block.

This is useful when used on landing pages.

### Horizontal Tab Block

Basic tab functionality within a block. The tab headers are within the block but above the editable panel. Use the UI button to add more tab.

Tab header is also editable with text only.

### Vertical Tab Block

Same as horizontal tab block, but vertical on the left. 

Another difference is that tab headers support image. It is useful for making vCard.

### Accordion Tab

It starts out with a single header at the top of the block. Adding another will slide the content up to show another panel.

Like horizontal tab block, accordion header is text only and editable.

### Marquee Tab

Similar to tabs but no header. On adding a new marquee, a drop spot appears for the user to drag and drop *a URL* to it (no upload support). After dropped, the marquee will show the image, and the user can enter text on top of it if needed.

At the bottom of the block will be indicators that the user can click on to switch between marqueen.

The marquees are also rotating using an interval defined from an input in the UI.
