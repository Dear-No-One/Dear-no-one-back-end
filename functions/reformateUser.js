function reformMember (member) {
    const reformatted = [];
    const memberById = {};
    member.forEach(member => {
        if(memberById[member.memberId]){
            memberById[member.memberId].blogs.push(member.postId);
    }
        else {
        memberById[member.memberId] = {
            id: member.memberId,
            username: member.username,
            email: member.email,
            password: member.password,
            bio: member.bio,
            template: member.template,
            theme: member.theme,
            profilePic: member.profilePic,
            blogPic: member.blogPic,
            facebook: member.facebook,
            twitter: member.twitter,
            instagram: member.instagram,
            blogs: [member.postId]
        };
        reformatted.push(memberById[member.memberId]);
        }
    });
    return reformatted;
}


module.exports = {
    reformMember
};
