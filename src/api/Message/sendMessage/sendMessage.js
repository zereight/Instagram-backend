import Room from '../../../models/Room';
import Message from '../../../models/Message';
import User from '../../../models/User';

export default {
	Mutation: {
		sendMessage: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);

			const { roomId, message, toId } = args;
			const { user } = request;
			try {
				const newMessage = await Message.create({
					text: message,
					from: user._id,
					to: toId
				});

				const me = await User.findById({ _id: user._id });
				const to = await User.findById({ _id: toId });

				if (roomId) {
					// chatroom exist
					newMessage.room = roomId; // message add roomid
					await newMessage.save();
					// room add message
					const room = await Room.findById({ _id: roomId });
					room.messages.push(newMessage._id);
					// room add participant if they are not in room

					if (room.participants.indexOf(user._id) === -1) {
						room.participants.push(user._id);
					}
					if (room.participants.indexOf(toId) === -1) {
						room.participants.push(toId);
					}
					await room.save();

					me.rooms.push(room);
					await me.save();
					to.rooms.push(room);
					await to.save();
				} else {
					// no chatroom
					const newRoom = await Room.create({
						messages: [ newMessage ],
						participants: [ user._id, toId ]
					});
					newMessage.room = newRoom._id;
					await newMessage.save();

					me.rooms.push(newRoom);
					await me.save();
					to.rooms.push(newRoom);
					await to.save();
				}

				return newMessage;
			} catch (error) {
				console.log(error);
				throw Error('sendMessage error!');
			}
		}
	}
};
