import { http } from './config'

export default{

    listar: () => {
        return http.get('crushs')
    },

    salvar:(crush) => {
        return http.post('crushs', crush)
    },

    atualizar: (crush) => {
        return http.put('crushs/' + crush._id, crush)
    },

    apagar: (crush) => {
        return http.delete('crushs/' + crush._id)
    }
}