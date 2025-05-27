import extractImageUrls from './extractImageUrls'

describe('extractImageUrls', () => {
  test('should extract image URL from simple object', () => {
    const input = { image: 'http://example.com/image.png' }
    const result = extractImageUrls(input)
    expect(result).toEqual(['http://example.com/image.png'])
  })

  test('should extract image URLs from nested object', () => {
    const input = {
      details: {
        mainImage: 'http://example.com/photo.jpg',
        description: 'A beautiful photo',
      },
    }
    const result = extractImageUrls(input)
    expect(result).toEqual(['http://example.com/photo.jpg'])
  })

  test('should extract image URLs from array', () => {
    const input = {
      gallery: ['img1.gif', 'http://example.com/img2.webp'],
    }
    const result = extractImageUrls(input)
    expect(result).toEqual(['img1.gif', 'http://example.com/img2.webp'])
  })

  test('should handle mixed content including non-URL strings', () => {
    const input = {
      title: 'My Article',
      content: 'This is some text content',
      image: 'http://example.com/article.png',
      author: 'John Doe',
      tags: ['tech', 'programming'],
    }
    const result = extractImageUrls(input)
    expect(result).toEqual(['http://example.com/article.png'])
  })

  test('should extract data:image URLs', () => {
    const input = {
      avatar:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      name: 'User',
    }
    const result = extractImageUrls(input)
    expect(result).toEqual([
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    ])
  })

  test('should return unique URLs when duplicates exist', () => {
    const input = {
      image1: 'http://example.com/duplicate.jpg',
      image2: 'http://example.com/duplicate.jpg',
      gallery: [
        'http://example.com/duplicate.jpg',
        'http://example.com/unique.png',
      ],
    }
    const result = extractImageUrls(input)
    expect(result).toEqual([
      'http://example.com/duplicate.jpg',
      'http://example.com/unique.png',
    ])
  })

  test('should return empty array when no image URLs found', () => {
    const input = {
      title: 'Article Title',
      content: 'Some text content',
      author: 'John Doe',
      tags: ['tech', 'programming'],
      metadata: {
        created: '2023-01-01',
        views: 100,
      },
    }
    const result = extractImageUrls(input)
    expect(result).toEqual([])
  })

  test('should handle null input gracefully', () => {
    const result = extractImageUrls(null)
    expect(result).toEqual([])
  })

  test('should handle undefined input gracefully', () => {
    const result = extractImageUrls(undefined)
    expect(result).toEqual([])
  })

  test('should handle non-object input gracefully', () => {
    expect(extractImageUrls('string')).toEqual([])
    expect(extractImageUrls(123)).toEqual([])
    expect(extractImageUrls(true)).toEqual([])
  })

  test('should extract multiple different image formats', () => {
    const input = {
      images: {
        png: 'http://example.com/image.png',
        jpg: 'http://example.com/photo.jpg',
        jpeg: 'http://example.com/picture.jpeg',
        gif: 'http://example.com/animation.gif',
        webp: 'http://example.com/modern.webp',
        svg: 'http://example.com/vector.svg',
      },
    }
    const result = extractImageUrls(input)
    expect(result).toHaveLength(6)
    expect(result).toContain('http://example.com/image.png')
    expect(result).toContain('http://example.com/photo.jpg')
    expect(result).toContain('http://example.com/picture.jpeg')
    expect(result).toContain('http://example.com/animation.gif')
    expect(result).toContain('http://example.com/modern.webp')
    expect(result).toContain('http://example.com/vector.svg')
  })

  test('should handle URLs with query parameters', () => {
    const input = {
      thumbnail: 'http://example.com/thumb.jpg?size=small&quality=80',
      fullsize: 'http://example.com/full.png?width=1920&height=1080',
    }
    const result = extractImageUrls(input)
    expect(result).toEqual([
      'http://example.com/thumb.jpg?size=small&quality=80',
      'http://example.com/full.png?width=1920&height=1080',
    ])
  })

  test('should handle deeply nested objects', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            level4: {
              deepImage: 'http://example.com/deep.jpg',
            },
          },
        },
      },
    }
    const result = extractImageUrls(input)
    expect(result).toEqual(['http://example.com/deep.jpg'])
  })

  test('should handle arrays within nested objects', () => {
    const input = {
      article: {
        content: {
          sections: [
            {
              type: 'text',
              value: 'Some text',
            },
            {
              type: 'image',
              value: 'http://example.com/section1.png',
            },
            {
              type: 'gallery',
              images: [
                'http://example.com/gallery1.jpg',
                'http://example.com/gallery2.jpg',
              ],
            },
          ],
        },
      },
    }
    const result = extractImageUrls(input)
    expect(result).toEqual([
      'http://example.com/section1.png',
      'http://example.com/gallery1.jpg',
      'http://example.com/gallery2.jpg',
    ])
  })

  test('should handle case-insensitive file extensions', () => {
    const input = {
      upperCase: 'http://example.com/IMAGE.PNG',
      mixedCase: 'http://example.com/Photo.JpG',
      lowerCase: 'http://example.com/picture.gif',
    }
    const result = extractImageUrls(input)
    expect(result).toEqual([
      'http://example.com/IMAGE.PNG',
      'http://example.com/Photo.JpG',
      'http://example.com/picture.gif',
    ])
  })
})
