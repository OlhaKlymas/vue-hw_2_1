const SearchGuest = {
    props: {
        guests: {
            type: Array,
            required: true
        },
        searchAfterItems: {
            type: Array
        },
        filteredGuests: {
            type: Boolean       
        },
        allGuests:{
            type: Boolean
        }
    },
    data() {
        return {
            searchInput: ''
        }
    },
    methods: {
        searchItems(a){
            this.searchAfterItems.length = 0  
            this.$emit('hideAllGuest')     
            this.$emit('filteredGuestsHide')   
            this.guests.map(item => {     
                if(item._id.includes(a)||item.name.includes(a)||
                    item.company.includes(a)||item.email.includes(a)||item.phone.includes(a)||item.address.includes(a)){
                    this.searchAfterItems.push(item)
                }
            })
        }
    },
    template: `
        <div class="search-guest">
            <input type="text" v-model="searchInput" @change="searchItems(searchInput)">
            <button @click="searchItems(searchInput)">Поиск</button>
            <div v-if="!allGuests" class="result">
                <p>Результаты поиска</p>
                <p v-show="(searchAfterItems.length != 0 && !filteredGuests)">Найдено {{ searchAfterItems.length  }} гостей</p>
                <p v-show="(searchAfterItems.length == 0 && !filteredGuests)">Ничего не найдено</p>
            </div>
        </div>
    `
}
