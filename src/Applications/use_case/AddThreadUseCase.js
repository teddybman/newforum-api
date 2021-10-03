const NewThread = require('../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, owner) {
    const { title, body } = useCasePayload.payload;
    const newThread = new NewThread({ title, body, owner });

    return this._threadRepository.addThread(newThread);
  }
}

module.exports = AddThreadUseCase;
