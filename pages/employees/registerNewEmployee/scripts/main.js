import { allUtils } from "../../../../patternScripts/main.js";

allUtils.sideMenu()
allUtils.notes()
allUtils.access({user: {access: true}})

const cepInput = document.getElementById('cep')
cepInput.addEventListener('keyup', () => {
    if(cepInput.value.length >= 8) {
        allUtils.getCepInfos(cepInput.value).then(infos => {

            if(infos.erro) {
                cepInput.style.borderColor = "red"
                cepInput.style.outlineColor = "red"
                return
            }

            cepInput.style.borderColor = "green"
            cepInput.style.outlineColor = "green"

            document.getElementById('address').value = infos.logradouro
            document.getElementById('neighborhood').value = infos.bairro
            document.getElementById('city').value = infos.localidade
            document.getElementById('state').value = infos.uf
        }).catch(error => {
            alert('CEP inválido')
            cepInput.style.borderColor = "red"
            return
        })
    }
})

const birthdayInput = document.getElementById('birthday')
birthdayInput.addEventListener('blur', () => {
    if(!birthdayInput.value) {
        return
    }

    const date = new Date(birthdayInput.value)
    const diff = new Date(Date.now() - date)
    const diffInYears = Math.abs(diff.getUTCFullYear() - 1970)
    
    document.getElementById('age').value = diffInYears
})