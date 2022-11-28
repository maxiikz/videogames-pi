import{
    GAMES_DETAIL,GET_GAMES,GET_GENRES,ORDER,FILTER,SEARCH_NAME
}from './actions/funciones';

const initialState={
totalGames:[],
gameDetail:{},
genres:[],
filtered:[],
gameBack:[]
};

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_GAMES:
            return{
                ...state,
                totalGames:action.payload,
                gameBack:action.payload,
                filtered:action.payload
            };
        case GET_GENRES:
            return{
                ...state,
                genres:action.payload
            };
        case GAMES_DETAIL:
            return{
                ...state,
                gameDetail:action.payload
            }
        case SEARCH_NAME:
            return{
                ...state,
                gameBack: action.payload,
                filtered: action.payload
            };
        case FILTER:
            if (action.payload=== 'default'){
                return {...state, filtered: state.gameBack}
            }
            if (action.payload=== 'API'){
                return{...state, filtered:state.gameBack.filter((f)=>(typeof f.id)==='number')}
            }
            if (action.payload === 'DB'){
                return {...state, filtered:state.gameBack.filter((f)=>(typeof f.id)=== 'string')}
            }
            else{
                return {...state, filtered: state.gameBack.filter((f)=>{
                    return f.genres.find((g)=>{
                        return g ===action.payload
                    })
                })}
            };

        case ORDER:
            if(action.payload === 'A-Z'){
                return{
                    ...state, filtered:[...state.filtered].sort((a,b)=>{
                        if(a.name > b.name) return 1;
                        if(a.name < b.name) return -1;
                        return 0;
                    }) } }
            if(action.payload === 'Z-A'){
                 return{
                    ...state, filtered:[...state.filtered].sort((a,b)=>{
                         if(a.name > b.name) return -1;
                         if(a.name < b.name) return 1;
                         return 0;
                            }) } }
            if (action.payload==='desc'){
                return{...state, filtered:[...state.filtered].sort((p,n)=>p.rating - n.rating)}
            }
            if (action.payload==='asc'){
                return{...state, filtered:[...state.filtered].sort((p,n)=>n.rating - p.rating)}
            }else{
                return{...state, filtered: state.gameBack}
            };
                    
        default:
            return state;
    }
};