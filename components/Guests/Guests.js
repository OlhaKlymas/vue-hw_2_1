const Guests = {
    components: {
        GuestItem,
        SearchGuest,
        FilterGuests
    },
    data() {
        return {
            guests: [],
            searchAfterItems: [],
            allGuests: true,
            filteredGuests: false,
            cameGuests: [],
            showcameGuests: false,
            absentGuests: []
        }
    },
    created() {
        this.guests = guestsList
    },
    mounted(){
        this.guests.map(item => {
            if(item.isPresent) {
                this.cameGuests.push(item)
            }
            else{
                this.absentGuests.push(item)
            }
        })     
    },
    methods: {
        presenceToggler(id) {
            this.guests = this.guests.map(item => {
                if(item._id === id) {
                    item.isPresent = !item.isPresent
                }
                return item
            })
            this.cameGuests.length = 0
            this.absentGuests.length = 0
            this.guests.map(item => {
                if(item.isPresent) {
                    this.cameGuests.push(item)
                }
                else{
                    this.absentGuests.push(item)
                }
            })
        },
        hideAllGuest(){
            this.allGuests = false
        },
        showAllGuests(){
            this.allGuests = true
        },
        filteredGuestsHide(){
            this.filteredGuests = false
        },
        filterGuests(a){
            this.searchAfterItems.length = 0            
            this.filteredGuests = true
            this.showcameGuests = a
            this.allGuests = false
            this.cameGuests.length = 0
            this.absentGuests.length = 0
            this.guests.map(item => {
                if(item.isPresent) {
                    this.cameGuests.push(item)
                }
                else{
                    this.absentGuests.push(item)
                }
            })
            
        }
    },
    template: `
        <div class="guests">

            <filter-guests 
                :guests="guests"
                :cameGuests="cameGuests"
                :absentGuests="absentGuests"
                @showAllGuests="showAllGuests"
                @filterGuests="filterGuests"
            ></filter-guests>

            <search-guest 
                :guests="guests"
                :allGuests="allGuests"
                :searchAfterItems="searchAfterItems"
                :filteredGuests="filteredGuests"
                @hideAllGuest="hideAllGuest"
                @filteredGuestsHide="filteredGuestsHide"
            ></search-guest>

            <ol>
                <guest-item v-if="allGuests"
                            v-for="guest in guests"
                            :key="guest._id"
                            :guest="guest"
                            @present-tog="presenceToggler"
                ></guest-item>
                <guest-item v-if="searchAfterItems"
                            v-for="guest in searchAfterItems"
                            :guest="guest" :key="guest.index"
                            @present-tog="presenceToggler"
                ></guest-item>
            </ol>
            <ol v-if="filteredGuests">
                <guest-item v-if="showcameGuests"
                            v-for="guest in cameGuests"
                            :guest="guest"
                            :key="guest.name"
                            @present-tog="presenceToggler"
                ></guest-item>
                <guest-item v-if="!showcameGuests"
                            v-for="guest in absentGuests"
                            :guest="guest"
                            :key="guest.phone"
                            @present-tog="presenceToggler"
                ></guest-item>
            </ol>
        </div>
    `
}
