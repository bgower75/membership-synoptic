const mockingoose = require('mockingoose').default
const Member = require('../models/membership-model')
const {createNewMember, getAllMemberships, getMemberByCardId, deleteMember, updateMember}  = require('../controller/membership-functionality')

describe("members", () => {
    it('should be defined', () => {
        expect(createNewMember).toBeDefined()
        expect(getAllMemberships).toBeDefined()
        expect(getMemberByCardId).toBeDefined()
        expect(deleteMember).toBeDefined()
        expect(updateMember).toBeDefined()
    })

    it('should create a member successfully!!', async () => {
        const mockMember = {
            name: 'Belinda Gower Test',
            empid: 11, 
            email: 'belinda.gower@test.com',
            mobile: "01234567890",
            pin: '1234',
            balance: 0
        }
        mockingoose(Member).toReturn(mockMember, 'save')
        const response = await Member.create(mockMember)
        expect(response.name).toBe(mockMember.name)
        expect(response.empid).toBe(mockMember.empid)
        expect(response.email).toBe(mockMember.email)
        expect(response.mobile).toBe(mockMember.mobile)
        expect(response.pin).toBe(mockMember.pin)
        expect(response.balance).toBe(mockMember.balance)
    })

    it('should return a member', async () => {
        const mockResponse = {
            _id: '5f0c80c447641625d017c649',
            name: 'Belinda Gower Test',
            balance: '10',
            empid: 1, 
            email: 'belinda.gower@test.com',
            mobile: '01234567890',
            pin: '$2b$10$aB5iGOX5wq97xEphUlhqWeUjx2I5ETpfITLfA6l02hWretXhOPQDi',
            cardId: 'E7sKQ5tKNyxIfxZ4'
        }
        mockingoose(Member).toReturn(mockResponse, 'findOne')
        const response = await Member.findOne(mockResponse)
        expect(JSON.parse(JSON.stringify(response._id))).toBe(mockResponse._id)
    })
    it('should delete a member', async () => {
        const mockResponse = {
            _id: '5f0c80c447641625d017c649',
            name: 'Belinda Gower Test',
            balance: '10',
            empid: 1, 
            email: 'belinda.gower@test.com',
            mobile: '01234567890',
            pin: '$2b$10$vfUSEhcov8w18P4Ui/Slh.4P8RQUYhewyUBwXSC8fxuwlUk1EhUke',
            cardId: 'E7sKQ5tKNyxIfxZ4'
        }
        mockingoose(Member).toReturn(mockResponse, 'findOne')
        const response = await Member.findOneAndDelete(mockResponse._id)
        expect(response).toBe(undefined)
    })
    it('should update a member', async() => {
        const mockResponse =  {
            _id: '5f0c80c447641625d017c649',
            name: 'Belinda Gower Test',
            balance: '10',
            empid: 1, 
            email: 'belinda.gower@test.com',
            mobile: '01234567890',
            pin: '$2b$10$vfUSEhcov8w18P4Ui/Slh.4P8RQUYhewyUBwXSC8fxuwlUk1EhUke',
            cardId: 'E7sKQ5tKNyxIfxZ4'
        }
        mockingoose(Member).toReturn(mockResponse, 'findOne')
        const change = 'changedName'
        await Member.update(mockResponse.name = change).where({_id:mockResponse._id})
        console.log(mockResponse.name)
        expect(mockResponse.name).toMatch(change)
    })
})
