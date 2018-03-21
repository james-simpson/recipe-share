import { shallow, mount } from 'vue-test-utils'
import RecipeCard from '../src/components/RecipeCard'
import { getRecipeDurationLabel, getDifficultyLabel } from '../src/utils.js'

jest.mock('../src/utils.js', () => ({
  getDifficultyLabel: jest.fn(),
  getRecipeDurationLabel: jest.fn(() => 'duration label')
}))

const createCmp = propsData => shallow(RecipeCard, { propsData })
const createMountedCmp = propsData => mount(RecipeCard, { propsData })

describe('RecipeCard', () => {
  let cmp
  const defaultProps = {
    title: 'Egg custard tarts',
    author: 'Gregg Wallace',
    time: 60,
    difficulty: 3,
    vegetarian: false,
    vegan: false,
  }

  cmp = createCmp(defaultProps);

  beforeEach(() => {
    jest.resetModules()
    jest.resetAllMocks()
  })

  describe('HTML', () => {
    const mountedCmp = createMountedCmp(defaultProps)
    it('is as expected', () => {
      expect(mountedCmp.vm.$el).toMatchSnapshot()
    })

    it('is as expected when recipe is vegetarian', () => {
      const mountedCmp = createMountedCmp(defaultProps)
      cmp = createCmp({ vegetarian: true })
      expect(mountedCmp.vm.$el).toMatchSnapshot()
    })

    it('is as expected when recipe is vegan', () => {
      cmp = createCmp({ vegetarian: true, vegan: true })
      expect(cmp.vm.$el).toMatchSnapshot()
    })
  })

  describe('Props', () => {
    cmp = createCmp({ })

    describe('title', () => {
      const title = cmp.vm.$options.props.title

      it('is required', () => {
        expect(title.required).toEqual(true)
      })

      it('is a string', () => {
        expect(title.type).toEqual(String)
      })
    })

    describe('author', () => {
      const author = cmp.vm.$options.props.author

      it('is required', () => {
        expect(author.required).toEqual(true)
      })

      it('is a string', () => {
        expect(author.type).toEqual(String)
      })
    })

    describe('image', () => {
      const image = cmp.vm.$options.props.image

      it('is not required', () => {
        expect(image.required).toBe(false)
      })

      it('defaults to undefined', () => {
        expect(cmp.props().image).toBe(undefined)
      })

      it('is a string', () => {
        expect(image.type).toEqual(String)
      })
    })

    describe('time', () => {
      const time = cmp.vm.$options.props.time

      it('is required', () => {
        expect(time.required).toEqual(true)
      })

      it('is a number', () => {
        expect(time.type).toEqual(Number)
      })
    })

    describe('difficulty', () => {
      const difficulty = cmp.vm.$options.props.difficulty

      it('is required', () => {
        expect(difficulty.required).toEqual(true)
      })

      it('is a number', () => {
        expect(difficulty.type).toEqual(Number)
      })
    })

    describe('vegetarian', () => {
      const vegetarian = cmp.vm.$options.props.vegetarian

      it('is required', () => {
        expect(vegetarian.required).toEqual(true)
      })

      it('is a boolean', () => {
        expect(vegetarian.type).toEqual(Boolean)
      })
    })

    describe('vegan', () => {
      const vegan = cmp.vm.$options.props.vegan

      it('is required', () => {
        expect(vegan.required).toEqual(true)
      })

      it('is a boolean', () => {
        expect(vegan.type).toEqual(Boolean)
      })
    })

    describe('sweet', () => {
      const sweet = cmp.vm.$options.props.sweet

      it('is required', () => {
        expect(sweet.required).toEqual(true)
      })

      it('is a boolean', () => {
        expect(sweet.type).toEqual(Boolean)
      })
    })

    describe('to', () => {
      const toLink = cmp.vm.$options.props.to

      it('is required', () => {
        expect(toLink.required).toEqual(true)
      })

      it('is a string', () => {
        expect(toLink.type).toEqual(String)
      })
    })
  })

  describe('Computed properties', () => {
    describe('color', () => {
      it('is correct if recipe is not vegetarian and not sweet', () => {
        cmp = createCmp({ vegetarian: false })
        expect(cmp.vm.color).toBe('cyan darken-1')
      })

      it('is correct if recipe is vegetarian and not sweet', () => {
        cmp = createCmp({ vegetarian: true })
        expect(cmp.vm.color).toBe('green')
      })

      it('is correct if recipe is sweet and vegetarian', () => {
        cmp = createCmp({ sweet: true, vegetarian: true })
        expect(cmp.vm.color).toBe('pink lighten-2')
      })

      it('is correct if recipe is sweet and not vegetarian', () => {
        cmp = createCmp({ sweet: true, vegetarian: false })
        expect(cmp.vm.color).toBe('pink lighten-2')
      })
    })

    describe('difficultyLabel', () => {
      it('calls getDifficultyLabel and returns the result', () => {
        getDifficultyLabel.mockReturnValue('difficulty label')
        cmp = createCmp(defaultProps)
        expect(getDifficultyLabel).toBeCalledWith(3)
        expect(cmp.vm.difficultyLabel).toBe('difficulty label')
      })
    })

    describe('timeLabel', () => {
      it('calls getRecipeDurationLabel and returns the result', () => {
        getRecipeDurationLabel.mockReturnValue('duration label')
        cmp = createCmp(defaultProps)
        expect(getRecipeDurationLabel).toBeCalledWith(60)
        expect(cmp.vm.timeLabel).toBe('duration label')
      })
    })
  })
})
