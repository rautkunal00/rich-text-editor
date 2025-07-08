import type { Node as PMNode } from 'prosemirror-model'
import type { Editor } from '@tiptap/core'
import type { EditorView } from 'prosemirror-view'
import { iframeWindow } from '../globalVariables'


interface ResizableImageViewProps {
  node: PMNode
  view: EditorView
  getPos: () => number
  editor: Editor
}

export class ResizableImageView {
  dom: HTMLElement
  img: HTMLImageElement
  private node: PMNode
  private view: EditorView
  private getPos: () => number
  private editor: Editor
  private aspectRatio: number | null = null
  private lockAspect: boolean = true

  constructor({ node, view, getPos, editor }: ResizableImageViewProps) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.editor = editor

    this.aspectRatio = node.attrs.width && node.attrs.height
      ? node.attrs.width / node.attrs.height
      : null

    this.dom = document.createElement('div')
    this.dom.contentEditable = 'false'
    this.dom.className = 'resizable-image-wrapper'
    this.dom.style.position = 'relative'
    this.dom.style.display = 'inline-block'

    // Main image element
    this.img = document.createElement('img')
    this.img.src = node.attrs.src
    this.img.alt = node.attrs.alt || ''
    this.img.style.width = node.attrs.width ? `${node.attrs.width}px` : 'auto'
    this.img.style.height = node.attrs.height ? `${node.attrs.height}px` : 'auto'
    this.img.style.display = 'block'
    this.img.style.userSelect = 'none'

    this.img.addEventListener('dblclick', this.openEditPopup)
    this.dom.appendChild(this.img)

    this.addResizeHandles()
  }

  addResizeHandles() {
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

    corners.forEach(corner => {
      const handle = document.createElement('div')
      handle.className = `resize-handle ${corner}`
      Object.assign(handle.style, {
        width: '10px',
        height: '10px',
        backgroundColor: 'white',
        border: '1px solid gray',
        position: 'absolute',
        zIndex: '10',
      })

      // Position handle
      switch (corner) {
        case 'top-left':
          handle.style.top = '0'
          handle.style.left = '0'
          handle.style.cursor = 'nwse-resize'
          break
        case 'top-right':
          handle.style.top = '0'
          handle.style.right = '0'
          handle.style.cursor = 'nesw-resize'
          break
        case 'bottom-left':
          handle.style.bottom = '0'
          handle.style.left = '0'
          handle.style.cursor = 'nesw-resize'
          break
        case 'bottom-right':
          handle.style.bottom = '0'
          handle.style.right = '0'
          handle.style.cursor = 'nwse-resize'
          break
      }

      this.addDragHandler(handle)
      this.dom.appendChild(handle)
    })
  }

  addDragHandler(handle: HTMLDivElement) {
    let startX = 0
    let startY = 0
    let startWidth = 0
    let startHeight = 0

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      const diffX = e.clientX - startX
      const diffY = e.clientY - startY

      const newWidth = Math.max(20, startWidth + diffX)
      const newHeight = Math.max(20, startHeight + diffY)

      this.img.style.width = `${newWidth}px`
      this.img.style.height = `${newHeight}px`

      const transaction = this.view.state.tr.setNodeMarkup(this.getPos(), undefined, {
        ...this.node.attrs,
        width: newWidth,
        height: newHeight,
      })
      this.view.dispatch(transaction)
    }

    const onMouseUp = () => {
      iframeWindow.removeEventListener('mousemove', onMouseMove)
      iframeWindow.removeEventListener('mouseup', onMouseUp)
    }

    handle.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault()
      startX = e.clientX
      startY = e.clientY
      startWidth = this.img.offsetWidth
      startHeight = this.img.offsetHeight

      iframeWindow.addEventListener('mousemove', onMouseMove)
      iframeWindow.addEventListener('mouseup', onMouseUp)
    })
  }


  openEditPopup = () => {
    const currentAttrs = this.node.attrs
    const editor = this.editor

    editor.commands.showPopup?.({
      html: this.createAttributePopup(currentAttrs),
      center: true,
      closeOnOutsideClick: true,
    })
  }

  createAttributePopup(attrs: { width?: number; height?: number; alt?: string }) {
    const container = document.createElement('div')
    container.style.padding = '10px'

    const widthInput = document.createElement('input')
    widthInput.placeholder = 'Width'
    widthInput.value = attrs.width?.toString() || ''
    widthInput.style.marginBottom = '8px'

    const heightInput = document.createElement('input')
    heightInput.placeholder = 'Height'
    heightInput.value = attrs.height?.toString() || ''
    heightInput.style.marginBottom = '8px'

    const altInput = document.createElement('input')
    altInput.placeholder = 'Alt text'
    altInput.value = attrs.alt || ''
    altInput.style.marginBottom = '8px'

    const aspectLock = document.createElement('label')
    aspectLock.style.display = 'block'
    aspectLock.style.marginBottom = '8px'
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = this.lockAspect
    checkbox.style.marginRight = '6px'
    aspectLock.appendChild(checkbox)
    aspectLock.appendChild(document.createTextNode('Lock aspect ratio'))

      ;[widthInput, heightInput, altInput].forEach(input => {
        input.style.width = '100%'
        input.style.padding = '6px'
        container.appendChild(input)
      })

    container.appendChild(aspectLock)

    const submit = document.createElement('button')
    submit.textContent = 'Apply'
    submit.onclick = () => {
      const newWidth = parseInt(widthInput.value) || undefined
      const newHeight = parseInt(heightInput.value) || undefined

      this.lockAspect = checkbox.checked

      if (!this.aspectRatio && newWidth && newHeight) {
        this.aspectRatio = newWidth / newHeight
      }

      const newAttrs = {
        ...attrs,
        width: newWidth,
        height: newHeight,
        alt: altInput.value,
      }

      const transaction = this.view.state.tr.setNodeMarkup(this.getPos(), undefined, newAttrs)
      this.view.dispatch(transaction)
      this.editor.commands.closePopup?.()
    }

    container.appendChild(submit)
    return container
  }

  update(node: PMNode) {
    if (node.type !== this.node.type) return false

    this.node = node

    // Update DOM manually
    const { width, height, alt } = node.attrs
    if (width) {
      this.img.style.width = `${width}px`
    } else {
      this.img.style.removeProperty('width')
    }

    if (height) {
      this.img.style.height = `${height}px`
    } else {
      this.img.style.removeProperty('height')
    }

    this.img.alt = alt || ''

    return true
  }

}
