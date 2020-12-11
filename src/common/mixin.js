import { debounce } from './utils';
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.$bus.$on('itemImageLoad', () => {
            refresh()
        })
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        }
    }
}